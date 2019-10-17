import BaseMessenger from '../base/native-messenger'

const connection = Symbol('messenger:slave#connection')

class NativeMessenger extends BaseMessenger {
  constructor (options) {
    super(options)
    this[connection]()
  }

  [connection] () {
    window.senative.call('frontPageReady', '', function (code, msg, data) {})
  }
}

export default NativeMessenger
