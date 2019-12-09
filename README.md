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

### Demo演示

使用 `http-server` 或 Chrome 扩展 `Web Server for Chrome` 浏览Demo。

### `http-server`

在项目根目录执行以下命令：

```
http-server
```

然后访问：[http://127.0.0.1:8080/example/basic/](http://127.0.0.1:8080/example/basic/)

端口号可以自行设置。

### Chrome 浏览器插件 `Web Server for Chrome`

插件按照完毕后，可以将目录设置为项目根目录。

然后访问：[http://127.0.0.1:8887/example/basic/](http://127.0.0.1:8887/example/basic/)

端口号可以自行设置。

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

本项目严格施行PR制度，所有功能都应该通过提交PR合并到分支中。

所有功能均需要新建 feature 分支，例如：`feature/v-model`。当功能开发完毕时，将代码提交到远程`feature/v-model`分支，然后在Git系统的`Merge Requests`中点击`New Merge Request`，并详细编写描述。等待Code Review，期间会进行比较频繁的沟通，修改代码再提交Commit，直到PR完全没问题后成功合并代码并删除`feature/v-model`分支，代表该功能开发完毕。

但请注意，要保持PR的体积越小越好，否则会导致Code Review非常难以进行，评审者有权让开发者将一个大PR拆分成多个小的PR进行Code Review。

提交PR的准则是：PR的数量可以多，但是PR的改动要小。如果是一个改动特别大的PR，则最好拆分成多个小PR分批提交并进行Code Review。

格式化代码的PR和功能修改的PR不要同时提交，需要单独提交，以免对Code Review进行干扰。

#### PR描述准则

提交PR时，需要非常清晰的编写描述。

**第一行**：PR描述的第一行应该是对PR所做的具体工作的简短摘要，然后是空白行。

**主体**：主体应该尽可能地详细，充分包含代码改动的上下文，以便于Code Review。需要包括

1. 背景：该代码解决了什么问题
2. 解决方案：怎么解决的
3. 横向对比：为什么这是最好的方法。
4. 如果该解决方案有任何缺点，则应予以提及。

例如：

> 新增v-model指令，实现双向绑定功能
> 
> v-model指令提供了双线程模式下的表单与逻辑的双向绑定功能。
> 
> 实现方式借鉴了vue中v-model的实现。在vue中，v-model="value"指令经过编译处理为动态绑定了value, 然后给标签添加一个事件，并且在事件触发的时候动态修改value的值，以达到双向绑定的模式。
> 
> 在双线程模式下，直接通过value=XXX是无法完成渲染层和逻辑层的同步更新的，需要分别在渲染层和逻辑层进行数据的更新。而组件逻辑层的setData方法刚好实现了同时更新渲染层和逻辑层的功能。
> 
> 因此，当事件触发时，从Page层组件发送通知到逻辑层组件，在逻辑层组件中执行setData方法进行数据更新。步骤如下： 
>
> 1. 渲染层触发事件，调用slave模块的send方法将要更新的数据和当前的组件id传递给master主线程。
>
> 2. master主线程监听到对应事件，通过send方法将数据和组件id传递到逻辑层。
>
> 3. 逻辑层监听到对应事件，根据组件id获取要更新的组件，然后调用该组件的setData方法进行逻辑层和渲染层的数据与视图更新。
> 
> 缺点：现在的实现方式在性能上不是最优的解决方案。因为在page线程下监听到的change事件，需要先传到UI，然后再传到Logic，然后再传回UI然后再传回page更新DOM。相比之下，在page线程下监听到事件后， 直接更新当前DOM，然后发一个信号到Logic更新Logic中的数据 性能上会提升很多。
> 
> 优点：实现方式简单，而且在肉眼上无法观察到明显的性能差别。

### 文档

新增或修改某个功能时，如果对抛出的API或使用方式产生了变化，则需要同步修改或新增文档。

> 文档在`/doc/lone-api/`目录下。

文档中最好包含该功能的实现原理，以便日后其他开发者在修改这部分功能时，可以知道之前是如何实现的，以及代码整体的设计思路。

### Git 流程

Git流程遵从广为流传的 GitFlow 流程，两个长期分支：master与develop、以及若干个短期分支：feature、hotfix。

> 由于项目现在并没有线上版本，所以只有一个长期分支：Master。所有feature分支可以从master建立，开发完毕后通过Merge Request合并回Master。

**长期分支：**

* `master`：最终产品的代码，始终与线上保持一致，不允许直接在master上开发
* `develop`：汇总所有已完成的新功能的基础分支，长期存在（之后会将代码合并到master）。这里需要注意的是，develop分支的代码始终是已完成的，并且是经过测试无bug的代码。不要将未完成的功能合并到develop。可以将develop视作第二Master。

**短期分支：**

* `feature`：feature分支从develop分支生成，当功能开发完毕经过测试没问题后，将代码合并到develop，并且将分支删除。分支仅存在于开发过程中。
* `hotfix`：仅仅存在于对线上功能修复时，临时基于master生成的分支，修复完毕后将代码合并到master。（注意：将代码合并到master后，再合并到develop一份，以避免develop代码落后于master）

分支名以 `/` 分割，例如：`feature/a`、`hotfix/b`。

参考链接：[https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/git-flow)
