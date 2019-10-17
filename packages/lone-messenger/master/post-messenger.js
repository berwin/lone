import BaseMessenger from '../base/post-messenger'

const connection = Symbol('messenger:slave#connection')

class PostMessenger extends BaseMessenger {
  constructor (options) {
    super(options)
    this[connection]()
  }

  [connection] () {
    this._postMessage('connection')
  }

  _postMessage (type, data) {
    const slave = window.parent
    slave.postMessage({ type, channel: this.channel, data }, slave.origin)
  }
}

export default PostMessenger
