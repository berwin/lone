import BaseMessenger from '../base/native-messenger'

const connection = Symbol('messenger:slave#connection')

class NativeMessenger extends BaseMessenger {
  constructor () {
    super()
    this[connection]()
  }

  [connection] () {
    window.senative.call('frontPageReady', '', function (code, msg, data) {})
  }
}

export default NativeMessenger
