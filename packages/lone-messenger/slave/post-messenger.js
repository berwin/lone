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
    this._postMessage('connection', this.channel)
  }

  _onmessage (fn) {
    const vm = this
    window.addEventListener('message', function (evt) {
      if (evt.data.channel === vm.channel) {
        fn.call(evt, evt.data)
      }
    })
  }

  _postMessage (type, channel, data) {
    const slave = window.parent
    slave.postMessage({ type, channel, data }, slave.origin)
  }
}

export default PostMessenger
