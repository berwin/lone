import BaseMessenger from '../base/post-messenger'

const connection = Symbol('messenger:slave#connection')

class PostMessenger extends BaseMessenger {
  constructor (options) {
    super()
    this.channel = options.channel
    this[connection]()
  }

  [connection] () {
    this._postMessage('connection', this.channel)
  }

  _postMessage (type, channel, data) {
    const slave = window.parent
    slave.postMessage({ type, channel, data }, slave.origin)
  }
}

export default PostMessenger
