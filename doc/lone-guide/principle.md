# 各个功能的实现思路和考虑

从issue和merge request抄录下来的。

## issues

### #1 数据监听器 - watch - ★★★★

当数据发生变化时，需要执行开发者的回调函数，并传递给开发者两个值（new, old）

背景：目前所有数据的变动均通过setData修改，所以内部并没有Observe。希望实现一个API让开发者可以监听到数据的变化。

```javascript
{
  watch: {
    numberA: function(newData, oldData) {
      // 在 numberA 被设置时，执行这个函数
    }
  }
}
```
一期可以简单实现，只实现上面这一个简单的用法即可，如果后面有需求，再添加其他用法。

**提示：**

React没有watch这个API，对应的它提供了 beforeUpdate 和 updated 生命周期，我猜测可能 watch 并不是刚需，或者类似的需求可以用其他方式解决。

是否真的需要提供这个api给开发者使用，如果不提供，那么类似的需求是否有其他API可以解决问题？

**无论最终决定提供watch还是提供其他API，都要把理由写出来，大家讨论后在做决定。**

### #2 组件的Slot功能 - ★★★★

背景：目前组件不支持Slot功能，而该功能对于组件的灵活性非常重要，所以需要实现Slot功能。

一期可以实现一个简单的Slot功能：

1. **基本功能**

  组件实现：

  ```javascript
    {
      template: `
        <div class="demo-alert-box">
          <strong>Error!</strong>
          <slot></slot>
        </div>
      `
    }
  ```

  组件调用：

  ```html
    <alert-box>
      Something bad happened.
    </alert-box>
  ```

  渲染的结果为：

  ```html
    <div class="demo-alert-box">
      <strong>Error!</strong>
      Something bad happened.
    </div>
  ```

2. **组件调用时，可以设置属性，而这个属性与值，可以在组件内通过`this.data[name]`拿到。**

  ```html
    <navigation-link url="/profile">
      Your Profile
    </navigation-link>
  ```

  然后在 <navigation-link> 组件内可以访问`url`变量：

  ```html
    <a :href="url" class="nav-link">
      <slot></slot>
    </a>
  ```

  最终渲染结果为：

  ```html
    <a :href="/profile" class="nav-link">
      Your Profile
    </a>
  ```

  > 由于组件支持Props，可以接受父组件传递给子组件的数据，所以结合Slot自动实现了该功能。

3. **备用内容（打底内容）**

  备用内容也就是默认的内容，当组件被调用时，没有提供slot数据，那么这时候使用备用内容渲染。（等价于业务中常用的打底数据）

  例如在一个 `<submit-button>` 组件中：

  ```html
  <button type="submit">
      <slot></slot>
  </button>
  ```

  我们希望用户不提供任何内容时，按钮的内容为文本：Submit，所以为了将“Submit”作为后备内容，我们可以将它放在 <slot> 标签内：

  ```html
  <button type="submit">
      <slot>Submit</slot>
  </button>
  ```

  这样当用户不提供任何内容时：

  ```html
  <submit-button></submit-button>
  ```

  最终实际上渲染的结果为：

  ```html
  <button type="submit">
      Submit
  </button>
  ```

### #3 整个项目的错误统一处理 - ★★★

背景：目前项目的错误处理比较凌乱。有一些代码由于是从Vue上直接copy过来的，所以warn，error是Vue的语法，但我们又没实现warn和error等功能。

目标：

1. 所有开发者的回调函数，都应该catch住并在控制台给一个有意义的错误提示。
2. 开发一个统一的错误处理功能。

需要解决的问题：

* 编译器中，出了错误没有抛出友好的warn到控制台
* 生命周期或者任何用户的代码被执行时，如果报了错，没有被catch并提供一个友好的warn到控制台
* 其他未知的问题

具体实现可以参考Vue的实现。

warn目前在 lone-util 项目中是一个空函数，然后 lone-compiler-core/helper.js中又有一个baseWarn，lone-logic/helpers.js也有一个warn，可能还有其他未知的地方存在warn函数，因为代码是从vue copy过来的，所以整体比较凌乱，需要整体项目重新梳理。

### #4 路由与生命周期结合 - ★★★★

背景：很多生命周期与跳转路由的行为息息相关，本 `Issue` 解决所有路由切换行为导致生命周期触发的问题。

1. 跳转路由时，应触发新页面的`onShow`, `onLoad`, 且触发 `onLoad` 时，应当把参数传递进去。解决方案：!15

  ```javascript
    {
      onLoad (query) {
        console.log(query) // 应当可以获取到query
      }
    }
  ```

2. 跳转路由时，应触发旧页面的 `onHide`。解决方案：!12
3. 跳转到相同页面但 `query` 不同时，应当触发onLoad并且传递query。（由于每个页面都是一个新的iframe，所以该问题在现在这个架构天然存在，无需额外实现）

### #5 生命周期补全 - ★★★

**目前已实现的生命周期：**

1. beforeCreate
2. created
3. onReady && mounted

**未实现的生命周期：**

1. 页面调起相关(lipeng1) - ★★
  1. onLoad - 等价于 created ✅
  2. onShow
  3. onHide
2. 渲染相关(cuifan1) - ★★
  1. beforeMounted
  2. beforeUpdate
  3. updated
3. 销毁相关 - ★★★
  1. beforeDestroy & onUnload
  2. destroyed

其中有一些生命周期是因为没有类似的功能，例如：组件目前没有销毁逻辑，所以也就没有销毁相关的生命周期。



#### WIP: 生命周期 `onshow/onhide` 实现思路讨论 

**（lipeng 提问）：** 首先我考虑的是一个问题是使用场景 （两种）

1. 第一种就是关闭浏览器和打开浏览器的时候调用 此时调用document.onvisibilitychange去监听就ok 不过创建时间比较特殊 我想的是创建iframe的时候去做监听 然后发送通知 告诉每个组件页面页面是否展示 如果在每个组件document.onvisibilitychange这个会监听多次 有些性能浪费 如果每个组件做onshow的监听 这样也可以在别的地方去调用

2. 第二种就是当页面跳转路由的时候 这样上一个iframe会hide 新增的iframe会show 但是这个时间是比较难以确定的还需要博文指导 博文说是在每个组件init的时候去做监听 不过我任务在init的时候页面还没有创建 都是虚拟dom也没有办法判断是否都是在可视区 就算可以判断是在可视区 也不对 因为一个iframe有多个组件 有部分组件肯定不在可视区 这样判断肯定不是准确的 所以我认为还是监听iframe的变化比较准确 当iframe创建的时候 去show当前的组件 hide上一个比较正确

回复：@lipeng1 目前可以考虑到的两种场景正如你所说，有两大类，一类是完全等价于 `onvisibilitychange`， **页面级** 不可见时触发 `onHide`。另一类是路由。

**所有触发场景：**

1. 页面被其他窗口盖住
2. 类似于Mac系统切换了屏幕，或者在手机上按了Home键
3. 类似于浏览器切换了Tab标签到其他网站
4. 切换路由时，前一个页面需要执行`onHide`，新增页面需要触发`onShow`

以上场景1、2、3 使用`onvisibilitychange`即可监听，但由于我们有路由的场景，所以只是使用`onvisibilitychange`可能不足以覆盖所有场景，当然这是我猜测的，具体还需要去看下是否真的无法满足。

**针对路由的场景：**

如果第二个页面（第二个iframe）把前一个页面（第一个iframe）盖住，目前不确定这种场景下浏览器是否会在第一个iframe内部触发`onvisibilitychange`事件，如果触发则使用`onvisibilitychange`即可完成该需求的所有功能，如果无法满足，那么正如你所说，需要在创建第二个iframe的时候，通知第一个iframe内部去触发`onHide`相关的通知。

**另外，科普一下整体架构的运行流程：**

Master最先执行，然后初始化worker环境，然后创建第一个页面（默认页面），创建默认页面后再去实例化页面内的组件（称作渲染层组件），然后再实例化worker下的组件（称为逻辑组件）。

所以在渲染组件初始化时监听事件，不存在你所说的虚拟DOM的问题，渲染层组件通过`onvisibilitychange`发现页面`onHide`了，则发送一个信号到worker下的逻辑组件，去触发对应的`onHide`生命周期，`onShow`同理。

**需要注意的：**

这里唯一需要注意的是，如果`onvisibilitychange`无法满足路由切换的场景，那么需要在Master层去通知Page层内的组件`页面已经隐藏|显示了`。所以如何手动触发`onvisibilitychange`事件是个问题，如果不能手动触发`onvisibilitychange`则需要使用其他事件系统解决这个问题。

另外，如果组件触发了`onHide`，那么不应该再触发`onHide`，所以组件内需要有一个状态标识，如果当前组件已经是`hide`状态了，则不应该再触发`onHide`，因为之前触发过。

### #6 提供官方组件Logic运行环境 - ★★★★★

**背景：**

目前只有开发者的代码执行环境，是在web-worker里运行，而官方组件代码逻辑不应该放在web-worker里，应该直接放在Master层或Page层，已获得更高的渲染权限。

初步概念性思路：

当前的UI与Logic层之间的通信模型是：

* Page(ui层) -> Master -> WebWorker（逻辑层）
* WebWorker（逻辑层） -> Master -> Page(ui层)

所以只需要在通信模块中增强功能，将分辨信号如果是官方组件发出的则不转发至WebWorker（逻辑层），而是转发至官方组件代码所在的位置。

* Page(ui层) -> Master -> WebWorker（逻辑层）|（官方组件逻辑层）
* WebWorker（逻辑层）|（官方组件逻辑层） Master -> Page(ui层)

**确定API：**

官方组件的逻辑与模板同时注册到Page层，并且在Page层执行（在iframe里执行），同时新增 `official` 标识该组件是官方组件，需要在Page层执行逻辑，而不是在Worker下执行逻辑。例如：

```javascript
{
  official: true,
  name: 'official',
  template: `
    <div style="padding:10px 0;">
      <h1>I'm official component: {{n}}</h1>
    </div>
  `,
  data () {
    return {
      n: 0
    }
  }
}
```

**方向性实现思路：**

1. 将Logic组件相关的逻辑提取为通用的逻辑（`lone-logic`），同时服务于`开发者组件逻辑`与`官方组件逻辑`。
2. 新增`lone-logic-worker`模块，该模块基于`lone-logic`，提供开发者组件逻辑执行环境。注册到`web-worker`中执行。
3. 开发者组件逻辑的频道号固定为：`logic-worker`。官方组件逻辑的频道号为动态频道号（每个页面分配一个唯一的频道号）`logic-[pageId]`。
4. Page层的组件在发送信号时，需要判断当前组件是不是具备`official`标识，根据标识选择频道号（`worker-logic`，`[pageId]-logic`）。
5. 因为官方组件逻辑在Page层执行，所以选择使用`Slave`的`postMessage`模式进行通信，但使用页面级别的频道号`logic-[pageId]`。

> 正常Page层下的组件是组件级别的频道号。但官方逻辑执行组件因为复用`lone-logic`的组件逻辑，所以只能使用页面级频道号，然后页面级信号发送到`lone-logic`后，该模块内部会找到具体通知哪个组件执行逻辑。

**具体实现步骤：**

1. 提供辅助函数 `getLogicChannel`，该函数根据 `this.$official` 标识返回频道号 `logic-worker` 或 `logic-[pageID]`，UI层组件根据频道号将信号发送到指定环境（沙箱环境|Master环境）。函数需要放在UI组件实例上，以便模板中使用，因为模板在with中访问方法，例如：`with(this){访问方法}`。
2. Logic环境下会发送 `logic:inited` 信号通知`lone-ui` web-worker已经初始化完毕，`lone-ui`收到通知后，会创建第一个页面（也就是默认页面）。现在这个信号移动到`lone-logic-worker`下发送，因为该信号的本质是沙箱环境初始化完毕后，通知`lone-ui`创建默认页面。而官方组件逻辑执行环境（`lone-logic-master`）则不需要发送这个信号。
3. Page层（`lone-page`）在初始化时，注册官方逻辑组件，包括组件注册，schedule系统初始化与Slave信号的初始化，Slave频道号为`字符串'logic'+[当前页面的PID]`（`logic-[pid]`）
4. 注册组件使用通用`lone-logic`模块注册，该模块提供了环境无关的核心组件逻辑。

**运行逻辑**

1. 沙箱环境创建并初始化时，注册开发者的组件（只注册，不实例化）
2. 随后从沙箱发送信号`logic:inited`到UI，UI开始创建页面（默认页面）
3. Page创建并开始初始化时，同时注册所有组件的模板与官方组件的逻辑。（官方组件逻辑部分和模板均注册在Page下，而开发者的组件只有模板注册在Page下）
4. 之后的逻辑如下：
5. 开发者的组件，渲染组件发信号到Master层（`lone-ui`），`lone-ui`会将信号转发到对应的逻辑层。逻辑层会根据ID找到具体对应的组件。信号转发的规则是根据频道号，所以渲染组件需要指定自己要往哪个频道发送信号，而这个频道是根据自己是否有`official`标识来判断的，如果没有，则固定发送到`logic-worker`有标识则发送到`logic-[PageID]`
6. 逻辑层发送信号会广播至所有Page页面的组件，但由于渲染组件的频道号是细粒度到组件级，所以只有频道号匹配的才会响应。
7. 综上，渲染组件可以发信号到沙箱中的逻辑组件，也可以发信号到Page层下的逻辑组件。逻辑组件也可以发信号到渲染组件。

通过以上解决方案，解决了官方组件原生能力受限问题。

### #7 Slot功能增强 - ★★★★★

背景：第一期组件Slot功能（ #2  ）实现了最基本的插槽功能，但功能较为单一，现需要新增一些功能。

**功能列表：**

1. **在插槽中使用数据时，应该访问当前组件的数据，而不是子组件的数据。**

  例如：

  ```html
  <navigation-link url="/profile">
      Logged in as {{ user.name }}
  </navigation-link>
  ```

  插槽内容中的`user.name`应该是当前组件中的数据，而不是`navigation-link`组件中的数据。

  关于模板访问数据，应始终遵循一个准则： **当前组件的模板里，所有内容都访问当前组件的数据**，例如：

  ```html
    <foo>
      <bar>
        <baz>
          {{ foo }} {{ bar }} {{ baz }}
        </baz>
      </bar>
    </foo>
  ```
  
  在模板中访问数据，无论嵌套多少层组件的Slot，都只访问本组件的数据。

2. **具名插槽**

  有时我们需要多个插槽。例如对于一个带有如下模板的 <base-layout> 组件：

  ```html
    <div class="container">
      <header>
        <!-- 我们希望把页头放这里 -->
      </header>
      <main>
        <!-- 我们希望把主要内容放这里 -->
      </main>
      <footer>
        <!-- 我们希望把页脚放这里 -->
      </footer>
    </div>
  ```

  对于这样的情况，`<slot>` 元素有一个特殊的特性：`name`。这个特性可以用来定义额外的插槽：

  ```html
    <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  ```

  不带 name 的 <slot> 出口会带有隐含的名字“default”。

  在向具名插槽提供内容的时候，我们可以在元素上使用 `slot` 属性的形式提供其名称：

  ```html
    <base-layout>
      <p slot="header">Slot Header</p>
      <p>Slot main content.</p>
      <p slot="footer">Slot Footer</p>
    </base-layout>
  ```

  现在元素中的所有内容都将会被传入相应的插槽。任何没有被包裹在带`slot` 属性中的内容都会被视为默认插槽内容。

  支持更明确的写法，可以使用`slot="default"`包裹默认插槽的内容：

  ```html
    <base-layout>
      <p slot="header">Slot Header</p>
      <p slot="default">Slot main content.</p>
      <p slot="footer">Slot Footer</p>
    </base-layout>
  ```

  任何一种写法都会渲染出：

  ```html
    <div class="container">
      <header>
        <p>Slot Header</p>
      </header>
      <main>
        <p>Slot main content.</p>
      </main>
      <footer>
        <p>Slot Footer</p>
      </footer>
    </div>
  ```

### 兼容IE8 - ★★★

**背景**

由于该框架不止给360PC小程序使用，还会应用到导航Cube系统中，以及未来可能会提供给其他部门以及外部公司使用，需要考虑到兼容性问题，目前决定该框架需要兼容到IE8。

目前项目中使用了很多语法和API可能不兼容IE8，所以主要工作是提供一些PolyFill，将使用到的不兼容的语法换成其他兼容IE8的写法。

具体工作量不详，不确定项目中目前使用了多少不兼容IE8的语法。

**兼容IE8需要解决的问题：**

1. 将高级JS语法编译成IE8下支持的语法（通过配置Babel的preset的targets为`ie:8`）
2. 将项目中使用的`new Proxy`用其他写法代替
3. 将项目中使用的`Object.definedProperty`使用其他逻辑代替
4. webpack4会将ES6的模块语法转换成使用`Object.definedProperty`的写法，所以需要引入`@babel/plugin-transform-modules-commonjs`解决这个问题
5. 需要引入polyfill解决IE8下不支持的API，例如：`Object.keys`。

> 1. new Proxy 只在messenger模块中使用了，主要作用是避免base基类直接被new的安全检查。解决方案是直接把安全检查功能给删除了。
> 
> 2. `Object.definedProperty`在自己封装的`proxy`函数中使用了。

#### #8 自动切换开发者代码执行环境

**背景：**

由于项目要支持IE8，IE8下没有web-worker，所以在IE8这个环境下，需要自动切换开发者的代码执行环境。

详细信息移步 #9 

### #9 自动切换开发者代码执行环境 - ★★★★★

**背景：**

由于项目要支持IE8，IE8下没有web-worker，所以在IE8这个环境下，需要自动切换开发者的代码执行环境。

沙箱环境有很多：web-worker，iframe，realms，webAssembly等，需要思考切换到哪种方案更合适。

假设选择iframe，那么Master层需要进行改造。现在是无脑创建Worker，并与这个worker建立连接，并调度该worker与页面之间的信号传递。

改造后需要根据环境选择创建worker或iframe，然后与之建立连接，不同的环境通信时，会有略微的不同。

### #10 this.navigateTo 支持更多参数 - ★★

**背景**

`this.navigateTo` API现有功能较为单一，只支持传递URL，使页面跳转到对应页面。

例如：

```javascript
this.navigateTo({
  url: '/test'
})
```

现需新增功能如下：

```javascript
this.navigateTo({
  url: '/test',
  success () {},
  fail () {},
  complete () {}
})
```

参数具体描述：

|  属性   | 类型  |  必填   | 说明 |
|  ----  | ----  |  ----  | ----  |
| url | String | 是 | 需要跳转的页面的路由地址，路径后可以带参数。参数与路径之间使用 ? 分隔，参数键与参数值用 = 相连，不同参数用 & 分隔；如 'path?key=value&key2=value2' |
| success  | Function | 否  | 接口调用成功的回调函数 |
| fail  | function | 否 | 接口调用失败的回调函数 |
| complete | Function | 否  | 接口调用结束的回调函数（调用成功、失败都会执行） |

**提示**

需要新增“路由正确性检查”的策略（如果跳转到不存在的路由，执行`fail`回调函数）。

### #11 无法通过修改数据来修改表单状态 ★★★★

据观察发现`v-model`存在一些小问题：

1. 默认数据没有绑定到表单元素的`value`上
2. 修改数据时，表单的`value`没有跟着变

表现形式为：

包含`input`、`textarea`在内的一些表单元素都没有默认值，通过JS代码去修改数据时，表单元素的内容不会发生变化。

例如：`input`和`textarea`中的文本。

**解决方案：**

根据 snabbdom 的语法，通过 `props` 设置元素属性。Vue的模板编译中为`domProps`，所以只需要在模板编译阶段，将`domProps`改为`props`即可解决问题。

可查看 https://git.corp.qihoo.net/qiwoo/qiwoo_app_platform/commit/49c0fd2c74131837c7f94187eea4359363731bde

### #12 支持“多个小程序”在“同一个页面”下“同时运行” ★★★★

在360导航的Cube系统以及其他更多应用场景下，需要“多个小程序”在“同一个页面”同时运行。

**需要考虑的：**

1. 之前一个页面只有一个小程序时，iframe页面是直接`fixed`并且全屏展示的，改成多个小程序同时运行，则需要渲染到某个容器下。
2. 基于1，需要考虑小程序在某个容器下和整个页面全屏渲染的适配
3. 每个小程序有自己独立的路由系统
4. 每个小程序起一个独立的web-worker
5. 每个小程序有独立的Master控制
6. iframe的`z-index`根据自身小程序的路由数量设置
7. **每个小程序有自己独立的事件信号（不要发串）**

### 实现思路

> 由于不同的问题解决方案不同，所以以下将分别讨论不同问题的解决方案。

#### 1. 全屏一个iframe改为同一个页面可以存在多个iframe & 2. 全屏渲染的适配

解决方案：将iframe插入到某个指定的元素内，如果没有指定，则插入到body中全屏显示。

**具体实现：**

1. lone-ui 所暴露出的API新增 `container`参数，用于指定小程序在哪个父级容器下渲染
2. lone-util 新增query工具函数，用于根据`container`参数获取具体的父级元素，该工具函数搜索不到元素时，自动返回`body`元素
3. 创建元素时，将创建的iframe插入到父级元素下，移除iframe时也从父级元素下移除
4. iframe的大小，从父级元素获取，如果是body，则全屏。

#### 3. 每个小程序有自己独立的路由系统

由于路由功能是在lone-ui中实例化，且并没有全局变量，所以多个小程序均具备各自的路由实例与数据。

#### 4. 每个小程序起一个独立的web-worker

lone-ui实例化时，会创建worker，所以多个小程序会自动创建多个worker。

#### 5. 每个小程序有独立的Master控制

同一个页面可以执行多次`Lone.ui()`来初始化多个小程序。

**具体实现：**

在Lone-ui中新增`mid`，用于区分不同小程序实例。

`mid` = MiniApp ID 的缩写。

#### 6. iframe的`z-index`根据自身小程序的路由数量设置

在创建iframe时，根据路由的`stack.length`设置zIndex，由于每个小程序维护独立的`this.stack`，所以`z-index`总是正确的。

#### 7. 每个小程序有自己独立的事件信号

信号模块`lone-messenger`需要增强。保证多个小程序之间的信号可以传递到指定的组件中。

**实现思路：**

原来只有一个小程序，所以全局只有一个 Master 监听`message`事件，现在全局有多个小程序，所以有多个 Master 监听`message`事件。为了保证小程序A的信号不会发到小程序B中，需要将小程序ID传递给Master。Slave的频道号改为`mid_pid_cid`，当Slave发信号到Master层时，所有Master实例将检查 “频道号” 中的`mid`与自身的 `mid` 是否相同，如果不同则忽略该信号。

**具体实现步骤：**

1. 小程序（`lone-ui`）在实例化Master时，将自身的ID（mid）传递给 `lone-messenger` 的 Master 模块。
2. 在创建 iframe 时，将mid设置在iframe上，以便 Page 中的 Component 获取 `mid`
3. Slave的频道号由 `pid_cid` 改为 `mid_pid_cid`。
4. Slave新增自己的频道号，发送任何信号给Master时，除了发送目标频道号，还需要将自己的频道号一并发送。
5. Master接受到来自Slave的信号时，将根据`mid`分辨是否需要忽略Slave信号（如果mid与slave的 **来源频道号** 中包含的mid不一致则忽略）
6. **由于Logic中的web-worker的Slave，Master与Slave之间是通过引用传递信号，而不是频道号，所以多个web-worker可以使用相同的频道号，目前统一使用`logic-worker`，Master中根据此频道号分辨信号是否往web-worker中发**

### #13 是否需要划分App/Page/Component

目前，我们对标的微信在框架层划分了App/Page/Component的三级对象。

App：小程序级的方法和生命周期钩子 https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html

Page：我们可以认为是一个路由的方法和生命周期钩子
https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html

Component：每一个UI组件的方法和声明周期钩子
https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html

对应关系是 ： App(1)-(*)Page(1)-(*)Component 

实现了这些，可以将构建脚本的方法移动过来。同时和微信的一致性更高。不过有一定的开发成本。

### #14 组件销毁相关逻辑

背景：需提供组件的销毁API。

组件需提供`this.$destroy()`API用来销毁组件。

调用该方法时，完全销毁逻辑组件实例，清除一切引用于变量内存，清理事件监听器，从`componentStorage`中移除该组件。完全销毁渲染组件，清除组件内所有事件绑定。

同时触发`beforeDestroy` 与 `destroyed` 生命周期钩子。

提示：组件实例被销毁时，该组件实例的所有子组件实例，也应该一并销毁。


## Merge Request

### Feature/v-model

双线程v-model双向绑定的实现借鉴了vue中v-model的实现。在vue中，v-model="value"指令经过编译处理为动态绑定了value, 然后给标签添加一个事件，并且在事件触发的时候动态修改value的值，以达到双向绑定的模式。在双线程模式下，我们直接通过value=XXX是无法完成渲染层和逻辑层的同步更新的，需要分别在渲染层和逻辑层进行数据的更新。而组件逻辑层的setData方法刚好实现了同时更新渲染层和逻辑层的功能。因此，当事件触发时，采用了worker消息传递的方式，通知到逻辑层，在逻辑层执行setData方法进行数据更新。步骤如下： 1. 渲染层触发事件是，调用worker的send方法将要更新的数据和当前的组件id传递给master主线程。 2. master主线程监听到对应事件，通过send方法将数据和组件id传递到逻辑层。 3. 逻辑层监听到对应事件，根据组件id获取要更新的组件，然后调用该组件的setData方法进行数据更新。

### Hotfix/vmodel fixed


修复了双线程中v-model的若干问题。
#### 一、主要问题：

问题1： 多个复选框(checkbox)和radio使用v-model进行输入绑定渲染报错（使用了v-model绑定，分别报了_i/_q is not defined 的错误）。

原因： virtualdom渲染逻辑中缺少原型 _i 和 _q方法。

解决方案： 在virtualdom渲染逻辑中添加 _i 和 _q方法。

#### 问题2： 双线程模式下radio单选选中之后状态不能变更（更改选中选项后，前一个选中状态并不会取消）。

原因： vue中，在没有添加name属性值的radio中，可以通过动态的改变checked为true/false来改变radio的选中状态。 但是在双线程模式下，渲染层的数据却无法更新，理论上需要通过worker消息通信的机制进行更新，但是这个并不好处理。 所以选择了添加name属性的替代方案。

解决方案： 在编译阶段，手动地给绑定了v-model的radio添加name属性并赋予同一个属性值。

#### 问题3： 修复多个复选框v-model绑定数据不同步更新问题。

原因： 多个复选框的绑定数据更新时，没有通过worker消息传递方式更新逻辑层和渲染层的数据。

解决方案： 多个复选框的绑定数据需要更新时，通过worker的send方式进行渲染层和逻辑层的数据更新。

#### 二、其他小问题
fixed: 如果开发者自己添加了name则使用开发者的name。

lone-compiler-dom 中，page:vmodel的worker监听事件统一改为page:data。

### Feature/log

实现统一错误处理工具方法

背景：目前项目的错误处理比较凌乱。有一些代码由于是从Vue上直接copy过来的，所以warn，error是Vue的语法，但我们又没实现warn和error等功能
解决方案:
1.在 lone-util 中统一实现，集中管理,并暴露方法： handleError, warn, tip
2.通过参考Vue的实现，内部实现如下：

warn 使用 console.error 提示非法操作的具体位置（例如 Error in data()）和错误出现在哪个组件， 该方法不显示开发者code的错误的调用栈
tip 同 warn，使用的是 console.warn
handlerError 使用 warn 输出友好提示，并抛出调用栈
3.使用 lone-util 中实现的错误处理方法替换项目中已单独实现的，替换内容包括如下：

引用了 lone-logic/helper.js 的错误处理方法的
引用了 lone-util/index 的错误处理方法的

### 架构调整 - 新增lone-logic-worker

背景：计划新增官方组件逻辑运行环境（开发者组件逻辑运行在worker中，而官方组件逻辑运行在page里）

目前想到的解决方案有两种：

1. 官方组件与开发者组件完全一致，使用Lone.logic注册组件（在page中注册），该方案只需要在page中使用<script>将Lone-Logic引入进来即可
    1. 优点：开发成本低
    2. 缺点：messenger信号频道号需要特殊处理（根据不同的环境给一个不同的频道号）。
2. 官方组件的逻辑在page中和模板一起注册，例如：{template: 'xx', name: 'xx', onLoad (query) {console.log(query)}}
    1. 优点：组件注册的API更符合设计，而且频道号处理更清晰
    2. 缺点：开发成本相对1来说要高一点
最终决定使用第二种方案。

因为使用第二种方案，所以目前的lone-logic组件相关逻辑有很多可以复用的地方，所以将架构进行调整。调整完毕后的架构如下：

1. lone-logic - 核心通用的组件逻辑
2. lone-logic-worker - 组件逻辑在worker下执行的相关逻辑，主要处理messenger的调度和组件实例的管理。
3. lone-logic-master - 组件逻辑在page下执行的相关逻辑，主要处理messenger的调度和组件实例的管理。

### 架构调整 - 为了提供官方组件在Page层下执行逻辑而调整整体架构

**调整思路：**

1. 将Logic组件相关的逻辑提取为通用的逻辑（lone-logic），同时服务于开发者组件逻辑与官方组件逻辑。
2. 新增lone-logic-worker模块，该模块基于lone-logic，提供开发者组件逻辑执行环境。注册到web-worker中执行。
3. 开发者组件逻辑的频道号固定为：worker-logic。官方组件逻辑的频道号为动态频道号（每个页面分配一个唯一的频道号）[pageId]-logic。
3. Page层的组件在发送信号时，需要判断当前组件是不是具备official标识，根据标识选择频道号（worker-logic，[pageId]-logic）。
5. 因为官方组件逻辑在Page层执行，所以选择使用Slave的postMessage模式进行通信，但使用页面级别的频道号[pageId]-logic。

> 正常Page层下的组件是组件级别的频道号。但官方逻辑执行组件因为复用lone-logic的组件逻辑，所以只能使用页面级频道号，然后页面级信号发送到lone-logic后，该模块内部会找到具体通知哪个组件执行逻辑。

具体查看 #6

### Feature/lifecycle

补充渲染相关的生命周期 beforeMounted beforeUpdate updated

背景
```
用户可以注册生命周期钩子
```

解决方案

```
beforeMounted: 在logic层监听 ui:inited 里执行回调

logic层setData若数据未发生变化进行拦截，否则 执行beforeUpdate回调,发送 component:data ->ui->page

page层接收component:data _setData构造新的vnode,path更新DOM 后 将page:updated ->ui->logic

logic层接收ui:updated 执行用户回调updated
```

疑问

```
改变模板里没有的变量，视图不变，但依然执行 beforeUpdate updated 回调 （vue这种情况是不执行）
```

### 提供官方组件Logic运行环境

提供官方组件Logic运行环境

**背景：**

目前只有开发者的代码执行环境，是在web-worker里运行，而官方组件代码逻辑不应该放在web-worker里，应该直接放在Master层或Page层，已获得更高的渲染权限。

**具体实现步骤：**

1. 提供辅助函数 getLogicChannel，该函数根据 this.$official 标识返回频道号 logic-worker 或 logic-[pageID]，UI层组件根据频道号将信号发送到指定环境（沙箱环境|Master环境）。函数需要放在UI组件实例上，以便模板中使用，因为模板在with中访问方法，例如：with(this){访问方法}。
2. Logic环境下会发送 logic:inited 信号通知lone-ui web-worker已经初始化完毕，lone-ui收到通知后，会创建第一个页面（也就是默认页面）。现在这个信号移动到lone-logic-worker下发送，因为该信号的本质是沙箱环境初始化完毕后，通知lone-ui创建默认页面。而官方组件逻辑执行环境（lone-logic-master）则不需要发送这个信号。
3. Page层（lone-page）在初始化时，注册官方逻辑组件，包括组件注册，schedule系统初始化与Slave信号的初始化，Slave频道号为字符串'logic'+[当前页面的PID]（logic-[pid]）
4. 注册组件使用通用lone-logic模块注册，该模块提供了环境无关的核心组件逻辑。

更多信息请查看Issues：#6

### 生命周期 onhide 和onshow

新增生命周期：onShow与onHide。

**背景：**

实现的功能是：

1. 当页面不可见时触发 onHide 事件
2. 当页面可见时，触发 onShow 事件

可能会触发onHide的行为包括但不限于：

1. 小程序窗口被其他窗口挡住
2. 最小化小程序
3. 浏览器切换到其他Tab标签
4. 跳转新路由的时候，前一个页面的所有组件需要触发onHide

可能会触发onShow的行为包括但不限于：

1. 创建页面时
2. 页面由“不可见”变为“可见”时
3. 需注意的是，onShow与onHide无需反复触发。已经触发过onHide无需再次触发onHide。

**实现思路：**

由于渲染组件在Page（iframe）中执行，每个Page（iframe）存在唯一document环境，所以在Page初始时，在渲染组件中注册自定义事件。

例如：

```
document.addEventListener('onShow',function())
```

这样每个组件都注册了自定义事件，由于不同Page的document不同，所以只需在Page级别触发事件，即可通知该页面下所有组件触发对应的生命周期。

针对触发条件存在两种情况

* 全局 onvisibilitychange

    1. 当浏览器切换tab时
    2. 最小化的时候执行
    3. 主页面被其他窗口挡住时

    为了保证全局注册事件统一，在主页面中注册（packages/lone-ui初始化的时候注册），在主页面中触发事件。

* 局部
    * 当新增路由时，会像stack中push一个iframe的引用，所以在push之前，找到当前路由的iframe引用，然后执行它的自定义onHide事件

缺点：

onvisibilitychange 的初始注册事件，显得那个文件，格格不入

优点：

全局注册唯一事件，不会重复注册，重复触发

**更多详细信息，请查看issues：#5**

### 组件销毁钩子函数beforeDestroy和destroyed

新增组件销毁逻辑，并新增生命周期：beforeDestroy与destroyed。

目前销毁的有：

1. 逻辑组件中的 数据、组件事件，包括组件自身实力也会被销毁。
2. 渲染组件中只销毁了 DOM事件 与 UI，DOM事件包括：自定义事件 onShow与onHide，以及DOM元素上绑定的Click等事件。
目前在逻辑组件中暴露一个API $destroy，手动调用该API触发销毁逻辑

当API被调用时，触发以下逻辑：

1. 清除逻辑组件中的数据与事件
2. 逻辑组件 发送信号 到渲染组件（告诉渲染层逻辑层已经销毁完毕）
3. 渲染组件开始清除，DOM事件与UI
4. 渲染组件 发送信号 到逻辑组件（告诉逻辑层渲染层已经销毁完毕）
5. 逻辑层将逻辑组件实例删除

目前没有实现的功能时：

父组件实例触发销毁逻辑时，子组件实例没有销毁。

#### 评论

#### 评论一

代码中的逻辑为：Page中同时使用 `vm.slave.onmessage('component:patch')` 和自定义事件 `document.addEventListener('onDestroy')`接受销毁组件的信号。但其实只需要一个信号即可，建议只使用`vm.slave.onmessage('component:patch')` 接受销毁信号。

#### 评论二

实现思路不对，清除组件先暂时不删除DOM，但不代表不需要通知渲染层的组件进行destroy的逻辑。信号需要发送到渲染层，渲染层需要清除事件绑定等组件运行期间遗留的所有副作用。

因此：`vm && xxxxx` 这些安全检查语法需要删除，因为它会将本该报错的错误吞掉。

另外：`vm.$options = {}`不用删除。

还有：为什么触发 `destroyed` 之后清除事件？？

### 为 onLoad 生命周期新增 query 参数

实现思路：

1. 在创建 iframe 时，将 search 字符串设置到iframe属性上，当页面加载完毕后，可以获取到当前页面的search字符串：?a=b&c=d；（search 字符串的来源为 navigateTo的参数）
2. 发送 page:inited 信号创建逻辑层组件时，将 search 字符串一起发送到逻辑层
3. 逻辑层在创建组件时，将 search 字符串解析成 query 数据，并保存到组件上
4. 触发 onLoad 时，将 query 数据放在参数上

重要提示：

如果用户在初始化之前，调用setData，那么setData的信号将先于component:inited发送信号，会导致报错（因为setData会触发渲染，但数据还没设置到上下文，所以读不到数据会报错）。

为了防止此类事件发生，用户调用 setData 只有在 component:inited 发送之后才会发送信号。在此之前，调用setData不会发送信号，仅更改数据，component:inited 信号在发送时，会将最新的数据一起发送到渲染层。

### 路由API支持更多参数（success, fail, complete）#10

**背景：**

路由相关的API（navigateTo，redirectTo，navigateBack），需要新增 success，fail, complete 用来监听反馈。

**前提条件：**

1. 该需求需要考虑路由是否存在，创建路由时是否成功， 是否成功的信息需要从Master传递到Logic中。
2. 目前的Messenger信号是单项信号，收不到反馈

**解决思路：**

1. 增强 Messenger 模块，支持反馈信息。
2. 基于增强后的 Messenger 模块实现该需求
    1. Logic中监听信号反馈信息，并根据反馈信息调用对应的回调函数
    2. Master中，根据真实创建路由是否成功，将信息反馈给Messenger模块（Messenger模块会将反馈返回给发送方）

**增强 Messenger 模块：**

1. slave.send 返回Promise，通过监听Promise来得知该信号的反馈信息
2. slave.onmessage(type, fn) 第二个函数支持通过返回一个 Promise 将反馈信息发送给slave.send。（如果函数返回了reject状态的Promise，slave.send返回的Promise状态为reject）
3. master.onmessage(type, fn) 第二个函数支持返回 Promise 将反馈信息发送给slave.send。
4. 考虑到很多中转信号，目前是手动在lone-ui转发，本次修改也改成了自动将中转信号直接转发到Slave，无需中间手动转发。

**实现思路：**

1. slave.send 函数运行后返回Promise，在Promise内部发送信号后，监听 type为 [type + '#feedback']的消息，当收到消息时（该消息为反馈消息），根据返回的数据执行resolve或reject，并清除 [type + '#feedback'] 的监听。
2. Master或Slave收到信号执行回调时，使用Promise.resolve将函数的返回值转化为Promise，并根据该Promise的状态和数据，将信息重新发 [type + '#feedback'] 处。


**自动转发中转信号，实现思路:**

1. 在Master中收到信号时，检查是否存在targetChannel （如果存在说明信号是中转信号，因为发送给Master的信号不需要设置targetChannel）。
2. 如果存在，则直接向 targetChannel 发送信号，不执行其他任何操作。
3. 如果不存在，检查_messages并执行监听的回调。

**路由支持更多参数：**

1. 路由API中，直接使用Promise语法监听 slave.send 的状态，如果成功则执行success，失败执行fail，无论失败还是成功执行complete。
2. Master中根据路由是否成功并通过返回Promise状态将真实情况反馈给Messenger。
