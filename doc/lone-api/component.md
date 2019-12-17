# Component

### props

* 类型：Array<string> | Object
* 详情：
  
  props 可以是数组或对象，用于接收来自父组件的数据。props 可以是简单的数组，或者使用对象作为替代，对象允许配置高级选项，如类型检测、自定义验证和设置默认值。
  
  你可以基于对象的语法使用以下选项：
  
  * `type`: 可以是下列原生构造函数中的一种：`String`、`Number`、`Boolean`、`Array`、`Object`、`Date`、`Function`、`Symbol`、或上述内容组成的数组。。检查一个 `prop` 是否是给定的类型，否则抛出警告。
  * `default`: `any` 为该 `prop` 指定一个默认值。如果该 `prop` 没有被传入，则换做用这个值。
  * `required`: `Boolean` 定义该 `prop` 是否是必填项。在非生产环境中，如果这个值为 `true` 且该 `prop` 没有被传入的，则一个控制台警告将会被抛出。
  * `validator`: `Function` 自定义验证函数会将该 prop 的值作为唯一的参数代入。在非生产环境下，如果该函数返回一个 falsy 的值 (也就是验证失败)，一个控制台警告将会被抛出。你可以在这里查阅更多 prop 验证的相关信息。
  * `observer`: `Function` 属性值变化时的回调函数。

* **代码示例：**

  ```
  // 简单语法
  {
      props: ['size', 'myMessage']
  }

  // 对象语法
  {
      props: {
        // 检测类型
        height: Number,
        // 检测类型 + 其他验证
        age: {
          type: Number,
          default: 0,
          required: true,
          validator: function (value) {
            return value >= 0
          }
        },
        observer: function(newVal, oldVal) {
          // 属性值变化时执行
        }
      }
  }
  
  // 读取数据
  this.data.height
  ```
  
  Props与Data均通过 `this.data` 访问数据。

### Slot

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

4. **在插槽中使用数据时，应该访问当前组件的数据，而不是子组件的数据。**

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

5. **具名插槽**

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
