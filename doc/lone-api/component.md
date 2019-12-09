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