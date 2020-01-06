import BaseMessenger from './base'

const connection = Symbol('messenger:slave#connection')

class PostMessenger extends BaseMessenger {
  constructor (options) {
    super()
    this.channel = options.channel
    this.listen()
    this[connection]()
  }

  [connection] () {
    this._postMessage('connection')
  }

  _onmessage (fn) {
    const vm = this
    window.addEventListener('message', function (evt) {
      if (evt.data.targetChannel === vm.channel) {
        fn.call(evt, evt.data)
      }
    })
  }

  _postMessage (type, targetChannel, data) {
    const slave = window.parent
    slave.postMessage({ type, channel: this.channel, targetChannel, data }, slave.origin)
  }
}

export default PostMessenger
