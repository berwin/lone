#  Messenger

## Install

```
$ lerna add lone-messenger --scope=YourModule
```

## Usage

### Master

Create a Master `messenger`:

```javascript
import { Master } from 'lone-messenger'

const master = new Master({
  env: 'postMessage'
})

master.onmessage('customType', function (channel, data) {
  console.log(data)
})

master.send('customType', 'channel', {name: 'Berwin'})
```

#### Options

* mid - 在多个小程序并存时，用 mid 区分信号
* env - Switch PostMessage and NativeMessage, default is NativeMessage

#### Methods

* onmessage(type, fn)
  * type [String]
  * fn(data) data type is Object, 可以在该函数可以返回一个Promise，messenger内部会根据promise的状态发送反馈信息
* send(type, channel, data)
  * type [String]
  * channel [String]
  * data [Object]

### Slave

Create a Slave `messenger`:

```javascript
import { Slave } from 'seapp-shared/messenger'

const slave = new Slave({
  env: 'postMessage',
  channel: 'logic'
})

slave.onmessage('customType', function (data) {
  console.log(data)
})

slave.send('customType', 'channel', {name: 'Berwin'})
```
#### Options

* env - Switch PostMessage and NativeMessage, default is NativeMessage
* channel - 设置自己的频道号

#### Methods

* onmessage(type, fn)
  * type [String]
  * fn(data) data type is Object, 可以在该函数可以返回一个Promise，messenger内部会根据promise的状态发送反馈信息
* send(type, channel, data)
  * type [String]
  * channel [String]
  * data [Object]

**slave.send**

该函数返回Promise，可以得到信号的反馈信息，已得知某项事情的状态（成功|失败）。

```javascript
slave.send('customType', 'channel', {name: 'Berwin'}).then(res => {
  console.log('成功：', res)
}).catch(err => {
  console.log('失败：', err)
})
```

**slave.onmessage(type, fn)**

`fn` 可以返回一个Promise，messenger内部会根据promise的状态发送反馈信息。

```javascript
slave.onmessage('customType', function (data) {
  return Promise.reject('事情做失败了')
})
```
上面代码将会发送失败的反馈信号到`slave.send`处。
