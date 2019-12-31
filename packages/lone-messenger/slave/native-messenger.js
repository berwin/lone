// 该文件当前不可用，因为没有 Native 消息通道
import Messenger from './base'
import { isObject } from 'lone-util'

class NativeMessenger extends Messenger {
  constructor () {
    super()
    this.listen()
  }

  _onmessage (fn) {
    window.onSeNativeMessage = function (rawData) {
      const data = JSON.parse(rawData)
      fn(data)
    }
  }

  _postMessage (type, channel, data) {
    if (!isObject(data)) throw new TypeError('data must be plain object.')
    const bag = JSON.stringify({ type, channel, data })
    window.senative.call('sendMessage', bag, (code, data, msg) => {})
  }
}

export default NativeMessenger
