import Messenger from './messenger'

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
}

export default NativeMessenger
