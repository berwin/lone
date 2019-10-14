import Messenger from './messenger'
import { isObject } from 'lone-util'

class NativeMessenger extends Messenger {
  _postMessage (type, data) {
    if (!isObject(data)) throw new TypeError('data must be plain object.')
    const bag = JSON.stringify({ type, data })
    window.senative.call('sendMessage', bag, (code, data, msg) => {})
  }

  _onmessage (fn) {
    window.onSeNativeMessage = function (rawData) {
      const data = JSON.parse(rawData)
      fn(data)
    }
  }
}

export default NativeMessenger
