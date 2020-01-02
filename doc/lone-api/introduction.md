# 介绍

该框架完全基于Web技术提供了小程序运行引擎。

框架运行架构为：双线程 + 多WebView 架构。双线程指的是主线程（主页面）与逻辑线程（`web-worker`）。多WebView指的是小程序切换路由时是多页应用，目前技术方案为多个iframe叠加在一起实现路由跳转功能，每个iframe为一个小程序页面。

该框架提供三个JS文件，分别为：`Lone.ui.js`、`Lone.logic.js`与`Lone.page.js`。

* `Lone.ui.js`：该文件需在主页面中引入，负责收集小程序的全局配置，控制小程序的路由，调度进程间的信号传递等功能。
* `Lone.logic.js`：该文件在`web-worker`或其他沙箱环境下引入，负责注册用户的逻辑层组件，执行用户的生命周期，提供一些API等。
* `Lone.page.js`：该文件在Page中引入，`Lone.ui.js`在创建页面时，会自动将该文件引入到iframe中。该文件负责注册用户的渲染组件，控制模板渲染，模板编译等功能。

由于组件的逻辑和渲染在不同的环境下执行，所以组件的逻辑部分与渲染部分是拆开注册的。因此，逻辑组件指的是组件的逻辑执行部分，渲染组件指组件的模板渲染部分。

简单来说，组件的模板是渲染组件，组件的其他（数据，逻辑，生命周期等）为逻辑组件。

## Lone.ui(options)

该方法需要在主页面执行，每执行一次便实例化一个小程序。多次执行将在当前页面实例化多个小程序。

**基础用法：**

```javascript
Lone.ui({
  entry: {
    logic: './app.main.js',
    page: './app.page.js'
  },
  routes: [
    { path: '/', component: 'test' },
    { path: '/test', component: 'test2' },
    { path: '/official', component: 'official' },
    { path: '/lifecycle', component: 'lifecycle' }
  ]
})
```

### options - 必填项

#### `entry` [Object] - 必填项

用于设置用户代码文件地址，对象下有两个Key，均为必填项，分别是：`logic`与`page`。

* `logic`：该参数配置的URL所指向的文件会在沙箱环境下（例如：`web-worker`）引入并执行，该文件包含用户的逻辑组件注册代码。
* `page`：该参数配置的URL所指向的文件会在Page下引入并执行，该文件包含选渲染组件的注册逻辑。

#### `routes` [Array] - 必填项

配置小程序路由，数组中的每个 `Object` 为一个路由配置，配置中可以配置的参数为：

* `path` [String] - 路由地址
* `component` [String] - 路由所对应的根组件名

#### `container` [String] - 可选项

用于配置小程序的容器元素，默认值 `document.body`。**当一个页面内需要实例化多个小程序时非常有用。**

该参数的值为选择器字符串，内部使用`document.querySelector`实现，所以支持该API的所有语法。例如：`#cube-one`。

#### `mid` [String] - 可选项

用于设置小程序ID，`mid` 为 Miniapp ID 的缩写形式，默认值 `[timestamp_count]`，每个小程序都有自己独立的`mid`。**当一个页面内需要实例化多个小程序时非常有用。**

## Lone.logic(componentName, options)

逻辑组件注册器，该API用于将用户的逻辑代码注册到沙箱中执行。除了组件的模板，其余的一切（数据，生命周期，方法等）都通过该API注册。

例如：

```javascript
Lone.logic('test', {
  data () {
    return {
      n: 0,
      msg: 'default text'
    }
  },
  methods: {
    showModel () {
      console.log(this.data)
    }
  },
  mounted () {
    setTimeout(_ => {
      this.setData({
        n: 2
      })
    }, 1000)
  }
})
```

### componentName - 必选项

组件名，该组件名一定要和渲染组件相同。在框架内部，将组件的逻辑与组件的模板联系在一起的唯一凭证是组件名，所以在注册组件时，同一个组件的模板和逻辑，使用不同的api注册时，组件名一定要相同。

### options - 可选项

逻辑组件的 生命周期，数据，方法等都在该 `options` 中设置。更多详细用法请参考详细的API文档。

> 当不设置任何配置时，表示该组件无任何逻辑与数据，只是单纯的模板渲染。

## Lone.page(options)

渲染组件注册器，该API用于在Page内部执行，注册组件的模板。当组件的模板被注册后，会根据路由的配置实例化根组件。

例子：

```javascript
Lone.page({
  components: [
    {
      name: 'test',
      template: '<div>Message: {{ msg }}</div>'
    },
    {
      name: 'ad',
      template: '<div>我是广告</div>'
    }
  ]
})
```

### options - 必填项

#### `components: Array<Object>`

数组中的每个对象为一个独立的组件配置。

**name: String** - 必填项

组件名，该组件名必须与其对应的逻辑组件保持一致。

**template: String** - 必填项

模板字符串，支持Vue的所有模板语法，例如：指令，slot等。

**official: Boolean** - 可选项

标识该组件是否为 **官方组件**。

官方组件代码逻辑不应该放在web-worker里，应该直接放在Page层，已获得更高的渲染权限，所以官方组件需要使用`official`标识自己为官方组件。

如果组件为官方组件，那么组件逻辑直接在 `Lone.page` 中注册，无需使用 `Lone.logic` 注册。

例如：

```javascript
Lone.page({
  official: true,
  name: 'test',
  template: `
    <div style="padding:10px 0;">
      <p>我是官方组件，我可以直接用JS访问DOM与BOM</p>
      <p>因为我的JS在页面内的UI主线程中运行</p>
    </div>
  `,
  onReady () {
    console.log(document, window)
  }
})
```
