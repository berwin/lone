# 生命周期

* beforeCreate
* created
* beforeMount
* onReady && mounted
* beforeUpdate
* updated

#### beforeCreate

在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。

#### created

在实例创建完成后被立即调用。在这一步，除了UI还没有渲染，其他都已经完成。

#### beforeMount

在挂载开始之前被调用：相关的 render 函数首次被调用。

#### onReady && mounted

首次渲染完成后触发。

#### beforeUpdate

数据更新后，发生在虚拟 DOM 打补丁之前调用。

换句话说，渲染前调用。

#### updated

由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。

换句话说，渲染完成后调用。
