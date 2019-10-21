#  Messenger

## Install

```
$ lerna add lone-messenger --scope=YourModule
```

## Usage

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

## Options

* env - Switch PostMessage and NativeMessage, default is NativeMessage
* $onmessage(type, fn)
  * type [String]
  * fn(data) data type is Object
* $send(type, channel, data)
  * type [String]
  * channel [String]
  * data [Object]
