#!/usr/bin/env node
// Checks this public edition only. It never imports or runs the private package.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile, stat } from 'node:fs/promises';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
assert(args.every(arg => arg === '--record'), 'Only --record is supported');
const record = args.includes('--record');
const recordPath = 'assets/evidence/local-checks.json';
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const read = path => readFile(join(root, path), 'utf8');
const failures = [];
const checks = [];
function check(name, fn) {
  try { fn(); checks.push({ name, pass: true }); }
  catch (error) { failures.push({ name, error: error.message }); }
}
async function inventory(dir = '') {
  const result = [];
  for (const entry of await readdir(join(root, dir), { withFileTypes: true })) {
    if (['.git', '.local', 'node_modules', '.DS_Store'].includes(entry.name)) continue;
    const path = join(dir, entry.name);
    assert(!entry.isSymbolicLink(), `Public symlink is not allowed: ${path}`);
    if (entry.isDirectory()) result.push(...await inventory(path));
    else result.push(path);
  }
  return result.sort();
}
const files = await inventory();
const blobs = new Map(await Promise.all(files.map(async file => [file, await readFile(join(root, file))])));
const required = ['README.md', 'CLAUDE.md', '.gitignore', 'docs/architecture.md',
  'docs/engineering-decisions.md', 'docs/validation.md', 'docs/authorship-and-scope.md',
  'diagrams/README.md', 'diagrams/node-registry.yaml', 'diagrams/render-config.json',
  'assets/evidence/source-catalog.json', 'assets/evidence/excerpt-identities.json',
  'assets/evidence/historical-offline.md', 'assets/evidence/controlled-use.md',
  'scripts/render-diagrams.sh'];
check('Required public content exists and is nonempty', () => {
  for (const file of required) assert(blobs.get(file)?.length > 0, file);
});
check('Maintenance rules fit the 50-line limit', () => assert(blobs.get('CLAUDE.md').toString().trimEnd().split('\n').length <= 50));
check('README displays exactly two diagrams', () => assert.equal([...blobs.get('README.md').toString().matchAll(/!\[[^\]]*\]\([^)]*\)/g)].length, 2));

const diagrams = ['01-user-journey', '02-system-architecture', '03-scheduling-and-admission',
  '04-attempt-and-uncertainty', '05-control-and-recovery'];
const exports = [];
for (const name of diagrams) {
  const source = `diagrams/source/${name}.mmd`;
  check(`Diagram ${name}: source and both exports`, () => {
    assert(blobs.get(source)?.length > 100, 'Mermaid source missing');
    const svg = blobs.get(`diagrams/rendered/${name}.svg`);
    const png = blobs.get(`diagrams/rendered/${name}.png`);
    assert(svg?.toString().includes('<svg'), 'SVG missing');
    assert(!/<foreignObject\b/i.test(svg.toString()), 'SVG must use native text rather than HTML labels');
    assert(png?.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])), 'PNG missing or invalid');
    assert(!/<script\b|\bonload\s*=|\bonclick\s*=|<iframe\b|<image\b/i.test(svg.toString()), 'Active or embedded image content in SVG');
    const width = png.readUInt32BE(16), height = png.readUInt32BE(20);
    assert(width > 300 && height > 300, 'Export dimensions are too small');
    exports.push({ name, sourceSha256: sha(blobs.get(source)), svgSha256: sha(svg), pngSha256: sha(png), pngWidth: width, pngHeight: height });
  });
}
check('Exactly five Mermaid source diagrams', () => assert.equal(files.filter(file => file.endsWith('.mmd')).length, 5));

function headings(markdown) {
  const result = new Set();
  const seen = new Map();
  for (const match of markdown.matchAll(/^#{1,6}\s+(.+)$/gm)) {
    let slug = match[1].toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');
    const count = seen.get(slug) ?? 0;
    seen.set(slug, count + 1);
    result.add(count ? `${slug}-${count}` : slug);
  }
  return result;
}
const phoneNumber = /(?<![\w.])1[3-9]\d{9}(?![\w.])/;
check('Disclosure matcher ignores decimal SVG geometry', () => assert(!phoneNumber.test('x="259.14990234375"')));
check('Disclosure matcher still rejects standalone phone text', () => assert(phoneNumber.test('<text>' + ['138', '0013', '8000'].join('') + '</text>')));
let checkedLinks = 0;
for (const [file, bytes] of blobs) {
  const extension = extname(file);
  if (!['.md', '.mmd', '.svg', '.json', '.yaml', '.sh', '.mjs', '.gitignore'].includes(extension) && file !== '.gitignore') continue;
  const text = bytes.toString();
  const safeText = text.replace(/\b[a-f0-9]{40,64}\b/gi, '[digest]');
  check(`Disclosure scan: ${file}`, () => {
    for (const pattern of [ /\/(?:Users|home)\/[\w.-]+\//, /https?:\/\/(?:chatgpt\.com\/(?:c|g)\/|my\.feishu\.cn\/)/,
      /\bBearer\s+[A-Za-z0-9._-]{12,}/i, /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
      phoneNumber, /\b\d{17}[\dXx]\b/, /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
      /\b(?:campaign|attempt)-[a-f0-9]{8}-[a-f0-9-]{20,}\b/i ]) {
      assert(!pattern.test(safeText), 'Potential private data, contact detail or private locator');
    }
  });
  if (extension !== '.md') continue;
  check(`No unfinished public draft: ${file}`, () => assert(!/\b(?:TODO|TBD|FIXME)\b/.test(text)));
  for (const match of text.matchAll(/!?\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].replace(/^<|>$/g, '');
    if (/^https?:/.test(target)) { failures.push({ name: `Link in ${file}`, error: 'Use local public evidence instead of external/private dependencies' }); continue; }
    const [pathPart, fragment] = target.split('#');
    const resolved = resolve(root, dirname(file), decodeURIComponent(pathPart || ''));
    const linked = pathPart ? relative(root, resolved) : file;
    check(`Link ${++checkedLinks}: ${file} -> ${target}`, () => {
      assert(!linked.startsWith('..') && !target.startsWith('/'), 'Link escapes this repository');
      if (record && linked === recordPath && !blobs.has(linked)) return;
      assert(blobs.has(linked), `Missing linked file: ${linked}`);
      if (fragment && extname(linked) === '.md') assert(headings(blobs.get(linked).toString()).has(fragment), `Missing heading: ${fragment}`);
    });
  }
}

const catalogue = JSON.parse(await read('assets/evidence/source-catalog.json'));
const excerptIdentity = JSON.parse(await read('assets/evidence/excerpt-identities.json'));
check('Selected sources have stable identities', () => {
  assert.equal(catalogue.sources.length, 26);
  assert.equal(new Set(catalogue.sources.map(row => row.id)).size, 26);
  for (const row of catalogue.sources) assert(/^[a-f0-9]{64}$/.test(row.sha256) && row.bytes > 0, row.id);
  assert.equal(catalogue.sources.find(row => row.id === 'S10').sha256, excerptIdentity.sourceFileSha256);
});
const cases = await read('docs/engineering-decisions.md');
const snippets = [...cases.matchAll(/```js\n([\s\S]*?)\n```/g)].map(match => match[1]);
check('Exactly two verbatim excerpts with frozen identities', () => {
  assert.equal(snippets.length, 2);
  snippets.forEach((snippet, i) => assert.equal(sha(snippet), excerptIdentity.excerpts[i].sha256));
});
const context = vm.createContext({});
vm.runInContext(snippets.join('\n').replace(/^export /gm, ''), context, { timeout: 1000 });
const wake = context.computeNextWakeDelay;
const clock = context.classifyClockTransition;
const pureCases = [
  ['wake: nearby deadline shortens poll', () => assert.equal(wake({nowMs:10000,deadlines:[10051]}),51)],
  ['wake: overdue deadline is immediately due', () => assert.equal(wake({nowMs:10000,deadlines:[9999]}),0)],
  ['wake: distant deadline is capped', () => assert.equal(wake({nowMs:10000,deadlines:[20000]}),100)],
  ['wake: no deadlines retains poll', () => assert.equal(wake({nowMs:10000,deadlines:[]}),100)],
  ['wake: nearest finite deadline wins', () => assert.equal(wake({nowMs:10000,deadlines:[NaN,Infinity,null,10080,10020]}),20)],
  ['wake: invalid wall sample is refused', () => assert.throws(()=>wake({nowMs:NaN,deadlines:[]}),/WAKE_PLAN_INVALID/)],
  ['wake: zero poll is refused', () => assert.throws(()=>wake({nowMs:1,deadlines:[],maxPollMs:0}),/WAKE_PLAN_INVALID/)],
  ['wake: infinite poll is refused', () => assert.throws(()=>wake({nowMs:1,deadlines:[],maxPollMs:Infinity}),/WAKE_PLAN_INVALID/)],
  ['clock: initial sample makes no jump claim', () => {const r=clock(null,{wallMs:1,monoMs:1});assert.equal(r.uncertain,false);assert.equal(r.resumed,false);}],
  ['clock: equal progress is ordinary', () => assert.equal(clock({wallMs:10000,monoMs:5000},{wallMs:10050,monoMs:5050}).reason,null)],
  ['clock: forward jump is uncertain', () => assert.equal(clock({wallMs:10000,monoMs:5000},{wallMs:13000,monoMs:5050}).reason,'WALL_CLOCK_JUMP')],
  ['clock: backward jump is uncertain', () => assert.equal(clock({wallMs:10000,monoMs:5000},{wallMs:7000,monoMs:5050}).reason,'WALL_CLOCK_JUMP')],
  ['clock: exact jump threshold is allowed', () => assert.equal(clock({wallMs:10000,monoMs:5000},{wallMs:11050,monoMs:5050}).uncertain,false)],
  ['clock: monotonic regression is distinct', () => assert.equal(clock({wallMs:10000,monoMs:5000},{wallMs:10001,monoMs:4999}).reason,'MONOTONIC_REGRESSION')],
  ['clock: long consistent pause is distinct', () => {const r=clock({wallMs:10000,monoMs:5000},{wallMs:16000,monoMs:11000});assert.equal(r.resumed,true);assert.equal(r.uncertain,false);}],
  ['clock: exact pause threshold is not resumed', () => assert.equal(clock({wallMs:10000,monoMs:5000},{wallMs:15000,monoMs:10000}).resumed,false)],
  ['clock: nonfinite difference is uncertain', () => assert.equal(clock({wallMs:10000,monoMs:5000},{wallMs:NaN,monoMs:5050}).reason,'WALL_CLOCK_JUMP')],
];
for (const [name, fn] of pureCases) check(name, fn);
const report = {
  schemaVersion: 1,
  result: failures.length ? 'FAIL' : 'PASS',
  checkedAt: new Date().toISOString(),
  runtime: process.version,
  verificationScope: 'Public case-study consistency and two published pure functions; not private product or online validation.',
  checksPassed: checks.length,
  failures,
  relativeLinksChecked: checkedLinks,
  pureFunctionCases: pureCases.length,
  pureFunctionResults: checks.filter(row => /^(wake|clock):/.test(row.name)),
  diagramExports: exports,
  publicInputFiles: files.filter(file => file !== recordPath).map(file => ({file,sha256:sha(blobs.get(file))})),
};
if (record && !failures.length) await writeFile(join(root, recordPath), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({result:report.result,checksPassed:report.checksPassed,relativeLinksChecked:checkedLinks,pureFunctionCases:pureCases.length,diagramPairs:exports.length,failures}, null, 2));
if (failures.length) process.exitCode = 1;
