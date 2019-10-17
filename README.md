# 双线程-多WebView架构下的小程序（实验中）

* lone-logic - Logic线程下的基础库代码，负责与UI线程通信，创建组件实例，执行组件生命周期等功能
* lone-ui - UI线程下的基础库代码，负责与Logic线程通信与创建webview
* lone-page - webview 内部的基础库代码，负责渲染
* lone-messenger 跨进程通信模块
* lone-util 公共工具函数库
