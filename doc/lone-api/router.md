# 路由

#### `this.navigateTo(options)`

跳转到新页面。

```javascript
this.navigateTo({
  url: '/test',
  success () {},
  fail () {},
  complete () {}
})
```

**参数具体描述：**

|  属性   | 类型  |  必填   | 说明 |
|  ----  | ----  |  ----  | ----  |
| url | String | 是 | 需要跳转的页面的路由地址，路径后可以带参数。参数与路径之间使用 ? 分隔，参数键与参数值用 = 相连，不同参数用 & 分隔；如 'path?key=value&key2=value2' |
| success  | Function | 否  | 接口调用成功的回调函数 |
| fail  | Function | 否 | 接口调用失败的回调函数 |
| complete | Function | 否  | 接口调用结束的回调函数（调用成功、失败都会执行） |

#### `this.redirectTo(options)`

参数与 `this.navigateTo` 相同，只是先移除当前页面，然后在跳转到新页面。

#### `this.navigateBack(options)`

关闭当前页面，返回上一页面或多级页面。

**参数具体描述：**

|  属性   | 类型  |  必填   | 说明 |
|  ----  | ----  |  ----  | ----  |
| delta | Number | 否 | 返回的页面数，如果 delta 大于现有页面数，则返回到首页。默认值：1 |
| success  | Function | 否  | 接口调用成功的回调函数 |
| fail  | Function | 否 | 接口调用失败的回调函数 |
| complete | Function | 否  | 接口调用结束的回调函数（调用成功、失败都会执行） |

