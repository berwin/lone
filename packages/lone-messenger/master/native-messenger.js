import { isObject } from 'lone-util'

class NativeMessenger {
  connection () {
    window.senative.call('frontPageReady', '', function (code, msg, data) {})
  }

  send (type, data, channel) {
    if (!isObject(data)) throw new TypeError('data must be plain object.')
    const bag = JSON.stringify({ type, data, channel })
    window.senative.call('sendMessage', bag, (code, data, msg) => {})
  }

  onmessage (fn) {
    window.onSeNativeMessage = function (rawData) {
      const data = JSON.parse(rawData)
      fn(data)
    }
  }
}

export default NativeMessenger
