# 双线程-多WebView架构下的小程序（实验中）

在提交您的贡献之前，请确保花一点事件通读以下准则：

* [开发环境设置](#开发环境设置)
* [项目架构](#项目架构)
* [工作流程指南](工作流程指南)

## 开发环境设置

安装依赖：

```
npm install && lerna bootstrap
```

### 脚本

#### `npm run dev`

持续观察文件系统的变化，当文件修改时，可以重新执行构建流程。

该命令会在`/dist`目录创建三个文件：

* `Lone.logic.js` - Logic线程下的基础库，负责处理与执行用户的JS逻辑。
* `Lone.page.js` - 每个WebView需要携带的JS文件，负责渲染UI。
* `Lone.ui.js` - 负责调度 Logic 与 Page 之间的消息通信，负责路由功能。
* `Lone.[name].js.map` - 用于 Debug 的 SourceMap 文件。

#### `npm run build`

与`dev`类似，但不会持续观察文件系统的变化，并且构建出的文件是经过压缩的。

## 项目架构

* `lone-compiler-core` - 与平台无关的编译器核心逻辑，
* `lone-compiler-dom` - 针对浏览器环境的编译器插件
* `lone-virtualdom` - 虚拟DOM渲染逻辑
* `lone-logic` - Logic线程下的基础库代码，负责与UI线程通信，创建组件实例，执行组件生命周期等功能
* `lone-ui` - UI线程下的基础库代码，负责与Logic线程通信与创建webview
* `lone-page` - webview 内部的基础库代码，负责渲染
* `lone-messenger` 跨进程通信模块
* `lone-util` 公共工具函数库

## 工作流程指南

为了确保本项目的代码健康程度不会随着时间的推移慢慢下降，请严格遵循Google工程指南实施代码评审制度（Code Review），在为本项目贡献代码前，请花一部分时间阅读Google工程实践文档。

文档地址：[https://github.com/google/eng-practices](https://github.com/google/eng-practices)

中文参考资料：[https://github.com/berwin/Blog/issues/44](https://github.com/berwin/Blog/issues/44)

### 代码提交流程

本项目严格施行PR制度，所有功能都应该通过提交PR合并到分支中。但请注意，要保持PR的体积越小越好，否则会导致Code Review非常难以进行，评审者有权让开发者将一个大PR拆分成多个小的PR进行Code Review。

Code Review发生在Feature分支，开发者将通过PR将自己的代码合并到Feature分支，以保证Feature分支合并到Developer时不需要做大量的Code Review工作。

### Git 流程

Git流程遵从广为流传的 GitFlow 流程，两个长期分支：master与develop、以及若干个短期分支：feature、hotfix。

**长期分支：**

* `master`：最终产品的代码，始终与线上保持一致，不允许直接在master上开发
* `develop`：汇总所有已完成的新功能的基础分支，长期存在（之后会将代码合并到master）。这里需要注意的是，develop分支的代码始终是已完成的，并且是经过测试无bug的代码。不要将未完成的功能合并到develop。可以将develop视作第二Master。

**短期分支：**

* `feature`：feature分支从develop分支生成，当功能开发完毕经过测试没问题后，将代码合并到develop，并且将分支删除。分支仅存在于开发过程中。
* `hotfix`：仅仅存在于对线上功能修复时，临时基于master生成的分支，修复完毕后将代码合并到master。（注意：将代码合并到master后，再合并到develop一份，以避免develop代码落后于master）

分支名以 `/` 分割，例如：`feature/a`、`hotfix/b`。

参考链接：[https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow)
