# 订票流程编排

[English](README.md) | [简体中文](README.zh-CN.md)

### 一个以可靠性为核心的工程案例

这是一个个人工程项目，探索如何可靠地协调长时间运行的订票任务、会话健康、受控提交，以及不确定结果的恢复。本仓库展示了一个 12306 订票项目的部分架构、工程决策和脱敏证据。平台相关实现保留在私有项目中。

**已取得的结果：**一套有文档说明的本地 CLI 架构、有实现依据的可靠性机制、历史离线验收，以及两个在限定范围内实际运行并到达人工支付或预付款交接阶段的案例。下文分别说明每项结果对应的版本和范围。

## 要解决的问题

订票流程可能需要等待数小时、持续观察余票变化，也可能在产生副作用后丢失响应，或在请求仍在执行时收到停止指令。多个任务共享同一账号，但查到余票并不代表获准提交。用户需要知道发生了什么、哪些结果仍不确定，以及下一步可以安全地做什么。

这些问题也存在于预约系统、订单处理、库存预留和业务自动化中。

## 用户流程

![从准备到核实结果的用户流程](diagrams/rendered/01-user-journey.svg)

用户选择精确目标，并明确选择 **Direct（直接购票）或 HouBu（候补）**。系统接收任务，等待或观察余票，检查执行资格，再评估官方证据。Direct 到达待支付阶段；HouBu 到达待预付款阶段。支付始终由用户手动完成。不确定结果（UNKNOWN）会被保留并核对，而不是盲目重新提交。

## 我的职责

我定义了产品边界和用户流程，设计了架构与恢复模型，指导 AI 辅助开发，通过故障场景质疑和检验结果，并负责验收决策。这是个人项目，而非客户委托项目。[贡献与公开范围 →](docs/authorship-and-scope.md)

## 三个工程重点

- **响应丢失后，仍能识别和恢复原始意图。** 稳定的请求标识用于处理重复的任务接收；每个 Attempt（执行尝试）都有持久化的 FINAL 屏障，约束对外提交。结果未知时，不会因此获得新的提交额度。[决策与取舍 →](docs/engineering-decisions.md#1-prevent-duplicate-submission-without-inventing-certainty)
- **共享观察结果，同时隔离执行。** 一个 Core（核心进程）合并余票查询工作并协调任务。私有 Candidate（执行候选材料）、账号活动和授权仍受执行准入检查约束。[决策与取舍 →](docs/engineering-decisions.md#2-share-inventory-facts-while-keeping-execution-private)
- **让调度与控制语义清晰可理解。** 感知截止时间的唤醒规划为现有调度器提供输入；停止、结果核对和继续观察分别表达不同的用户意图。两个简短的源码摘录展示了实现方式。[决策与代码摘录 →](docs/engineering-decisions.md#3-schedule-around-deadlines-and-explain-control-precisely)

## 系统如何组织

![一个 Core、独立 Renewer 与共享本地机制](diagrams/rendered/02-system-architecture.svg)

JavaScript ES Modules · Node.js CLI · Node 内置测试运行器 · 本地持久化业务事实 · 明确的 Session 与账号活动所有权。

一个 Booking Core 协调多个 Campaign（订票任务）。独立的 Renewer（会话续期进程）维护会话健康。共享机制对各入口的余票请求发送、会话写入和持久化事实施加约束。上图属于设计视图，并不表示每条分支都已通过线上验证。[架构与实际代码映射 →](docs/architecture.md)

## 证据与边界

| 证据 | 已确认的内容 | 适用边界 |
| --- | --- | --- |
| [历史离线验收](assets/evidence/historical-offline.md) | 固定的 2026-09-20 构建：记录了 21 项验收关卡和 1,494 项测试通过 | 仅限该历史版本的离线范围，不代表当前源码或线上验收 |
| [受控 Direct 使用](assets/evidence/controlled-use.md#h-direct--awaiting-payment) | 2026-09-28 的一次待支付结果，FINAL 发送次数为 1 | 不自动支付，不保证所有目标或长期运行效果 |
| [受控 HouBu 使用](assets/evidence/controlled-use.md#h-houbu--awaiting-prepayment) | 2026-09-27 的一次待预付款结果，归属于原始 Attempt | 到达预付款交接阶段不等于出票；历史报告中的局限仍然保留 |
| [本版检查记录](assets/evidence/local-checks.json) | 已公开代码摘录的检查、合成函数用例、链接与导出文件清单 | 属于文档检查，并非重新运行私有业务测试 |

上述历史产品版本与编写本案例所使用的源码快照不同。各自的成功结果、早期失败和局限分别记录，不相互替代。本仓库不包含完整的私有运行材料。[验证方法与未覆盖范围 →](docs/validation.md)

## 进一步阅读

- [五张图：可编辑源码、SVG 与作品集用 PNG 导出](diagrams/README.md)
- [架构、状态所有权与实现范围](docs/architecture.md)
- [三个工程决策与两段逐字源码摘录](docs/engineering-decisions.md)
- [验证矩阵与可复现的公开检查](docs/validation.md)
- [作者贡献、AI 辅助开发与保留的私有范围](docs/authorship-and-scope.md)
- [已检查来源的标识与摘要](assets/evidence/source-catalog.json)

本页为中文译本，图表和详细材料保留英文。检查公开材料：`node scripts/check.mjs`。使用已有的 Mermaid CLI 重新生成图表导出：`bash scripts/render-diagrams.sh`。

版权所有 © 2026 Devon。保留所有权利。本案例不分发可安装的订票客户端。
