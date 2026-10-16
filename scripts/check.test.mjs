// Regression tests for the public checker. All mutations use temporary copies.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { cp, mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(), 'booking-public-check-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  await cp(root, dir, { recursive: true, filter: path => !['.git', '.local', 'node_modules'].some(name => path === resolve(root, name) || path.startsWith(resolve(root, name) + '/')) });
  return dir;
}
function run(dir, ...args) {
  const result = spawnSync(process.execPath, ['scripts/check.mjs', ...args], { cwd: dir, encoding: 'utf8' });
  assert.equal(result.error, undefined);
  return { code: result.status, report: JSON.parse(result.stdout) };
}
async function append(dir, file, text) {
  const path = join(dir, file);
  await writeFile(path, await readFile(path, 'utf8') + text);
}

test('a recorded edition passes; changed prose is rejected until re-recorded', async t => {
  const dir = await fixture(t);
  assert.equal(run(dir, '--record').code, 0);
  assert.equal(run(dir).code, 0);
  await append(dir, 'README.md', '\nA new edition.\n');
  const stale = run(dir);
  assert.equal(stale.code, 1);
  assert(stale.report.failures.some(row => row.name === 'Recorded public inputs match this edition'));
  assert.equal(run(dir, '--record').code, 0);
  assert.equal(run(dir).code, 0);
});

test('file additions and removals invalidate the recorded edition', async t => {
  const dir = await fixture(t);
  assert.equal(run(dir, '--record').code, 0);
  await writeFile(join(dir, 'extra.md'), 'A public note.\n');
  assert.equal(run(dir).code, 1);
  assert.equal(run(dir, '--record').code, 0);
  await rm(join(dir, 'extra.md'));
  assert.equal(run(dir).code, 1);
});

test('catalogued official references are allowed; arbitrary and lookalike hosts fail', async t => {
  const dir = await fixture(t);
  const path = join(dir, 'assets/evidence/public-context.json');
  const context = JSON.parse(await readFile(path, 'utf8'));
  await append(dir, 'README.md', '\n[Official platform](https://www.12306.cn/en/index.html)\n');
  assert.equal(run(dir, '--record').code, 0);
  const validReadme = await readFile(join(dir, 'README.md'), 'utf8');
  await append(dir, 'README.md', '\n[Uncatalogued page](https://www.12306.cn/en/uncatalogued.html)\n');
  assert.equal(run(dir, '--record').code, 1);
  await writeFile(join(dir, 'README.md'), validReadme);
  context.sources[0].url = 'https://www.12306.cn.evil.example/en/index.html';
  await writeFile(path, JSON.stringify(context));
  const spoofed = run(dir, '--record');
  assert.equal(spoofed.code, 1);
  assert(spoofed.report.failures.some(row => row.name === 'External background references use catalogued official HTTPS pages'));
});

test('presentation can grow while required diagram sources and exports stay mandatory', async t => {
  const dir = await fixture(t);
  await append(dir, 'README.md', '\n![Additional preview](diagrams/rendered/03-scheduling-and-admission.svg)\n');
  await cp(join(dir, 'diagrams/source/01-user-journey.mmd'), join(dir, 'diagrams/source/06-extra.mmd'));
  await cp(join(dir, 'diagrams/rendered/01-user-journey.svg'), join(dir, 'diagrams/rendered/06-extra.svg'));
  await cp(join(dir, 'diagrams/rendered/01-user-journey.png'), join(dir, 'diagrams/rendered/06-extra.png'));
  assert.equal(run(dir, '--record').code, 0);
  await rm(join(dir, 'diagrams/rendered/06-extra.png'));
  assert.equal(run(dir, '--record').code, 1);
});
