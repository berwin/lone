生命周期是一组程序切面。在程序运行到适当的时机，会回调到对应的方法。同时给予约定的回调参数。

开发者可以在约定的切面上截获这些方法，并操作回调参数。

每个小程序我们认为是一个APP，每个APP由若干Page组成。

目前的小程序框架是基于vue的，因此兼容vue的生命周期，同时和主流的小程序框架生命周期是兼容的。

我们以时间顺序列出生命周期

| 生命周期钩子 |  vue框架 | 360小程序框架 | 主流小程序框架 |
| ---- | ---- | ---- | ----|
| beforeCreate | 支持 | 支持 |  -  |
| created | 支持 | 支持 | - |
| onLoad  | - | 支持，等价于created |  支持 |
| onShow | - | 支持 |  支持 |
| beforeMounted| 支持 | 支持 | - |
| mounted | 支持 | 支持 | - |
| onReady | - | 支持，等价于mounted | 支持 |
| beforeUpdate | 支持 | 支持 | - |
| updated | 支持 | 支持 | - |
| onHide | - | 支持 | 支持 |
| beforeDestroy | 支持 | 支持 |  - |
| onUnload | - | 支持，beforeDestroy | 支持 |
| destroyed | 支持 | 支持 |  - |

360小程序的生命周期目前分为两种：APP级和Page级。

调用的时序是：

1. APP级beforeCreate 

1. Page级beforeCreate

1. Page级created/onLoad

1. APP级created/onLoad

1. Page级mounted/onReady

1. APP级mounted/onReady

1. Page级beforeUpdate

1. APP级各Page级beforeUpdate

1. Page级updated

1. APP级updated

1. APP级onHide

1. Page级onHide

1. Page级beforeDestroy/onUnload

1. APP级beforeDestroy/onUnload

1. Page级destroyed

1. APP级destroyed



