# DeepSeek SuperAgent 个人试用

这个仓库用于试用 [dsh-superagent-prototype](https://github.com/deepseek-ai/dsh-superagent-prototype)。

当前试用通过本地适配，让 `yescoolfan` 同时作为任务发起人和执行账号；GitHub 操作仍显示为该账号。

## 发起任务

在本仓库新建 Issue，然后新发一条以 `/superagent` 开头的普通评论，例如：

```text
/superagent 请在 README 中增加一个简短的试用记录章节，并创建 PR 供我审查。
```

后续补充要求也使用这个前缀。Issue 正文、普通回复、代码行评论和 Review 不是单账号模式的指令入口。

自动回复会声明来自自动化 Agent。只接受允许名单内的任务，不开启自动合并；请审查 PR 后手动决定是否合并。
