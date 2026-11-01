# 本地运行

Node.js 22+，无第三方运行依赖；无需安装软件包。

    npm run dev

打开 <http://127.0.0.1:18780>。页面使用本地静态数据，刷新后恢复相同快照。

## 检查与构建

    npm test
    npm run build

测试覆盖样例完整性、统计、普通状态筛选、搜索、CSV 文本转义及本机预览服务。测试通过不代表所有业务条件已经验收；具体 Issue 的复现和回归也要验证。

build 将 public/ 拷贝到 dist/，开发时直接修改 public/。

## 为 PR 提供预览

在当前 Ticket 的独立工作目录中启动：

    npm run dev -- --port 18781

18780 保留给操作者的基线页面。若 18781 已占用，请选另一个空闲端口。服务只监听 127.0.0.1。

UI 变更须在同一场景、视口和状态下记录真实 Before / After 截图。提交 PR 时提供预览 URL、复现步骤和检查结果。人审查后决定是否合并。

## 文件

- public/data.js：六条虚构工单。
- public/ledger.js：筛选、统计、CSV 生成与下载字节。
- public/app.js：表格、详情和导出交互。
- public/index.html、public/styles.css：页面结构和样式。
- scripts/dev-server.mjs：仅暴露 public/ 的本机预览服务。
