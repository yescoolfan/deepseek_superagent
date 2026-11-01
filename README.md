# DeepSeek SuperAgent 个人试用

这个仓库用于试用 [dsh-superagent-prototype](https://github.com/deepseek-ai/dsh-superagent-prototype)。

当前试用通过本地适配，让 `yescoolfan` 同时作为任务发起人和执行账号；GitHub 操作仍显示为该账号。

## 设备异常台账演练

仓库现有一个可在浏览器操作的中文设备异常台账，用于演练连续的维护任务。所有设备、人员和数据均为虚构。

需要 Node.js 22+，不需要安装第三方依赖：

    npm run dev

打开 <http://127.0.0.1:18780>。页面包含概览、六条记录、快捷筛选、搜索、详情和 CSV 下载。

    npm test
    npm run build

业务规则见 [产品说明](docs/PRODUCT.md)，命令和 PR 预览方法见 [开发说明](docs/DEVELOPMENT.md)。

## 发起任务

在本仓库新建 Issue，然后新发一条以 `/superagent` 开头的普通评论，例如：

```text
/superagent 请在 README 中增加一个简短的试用记录章节，并创建 PR 供我审查。
```

后续补充要求也使用这个前缀。Issue 正文、普通回复、代码行评论和 Review 不是单账号模式的指令入口。

自动回复会声明来自自动化 Agent。只接受允许名单内的任务，不开启自动合并；请审查 PR 后手动决定是否合并。
