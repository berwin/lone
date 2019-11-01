import Messenger from '../base/native-messenger'
import { isObject } from 'lone-util'

class NativeMessenger extends Messenger {
  _postMessage (type, channel, data) {
    if (!isObject(data)) throw new TypeError('data must be plain object.')
    const bag = JSON.stringify({ type, channel, data })
    window.senative.call('sendMessage', bag, (code, data, msg) => {})
  }
}

export default NativeMessenger
