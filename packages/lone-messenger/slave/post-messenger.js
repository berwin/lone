import BaseMessenger from '../base/post-messenger'

const connection = Symbol('messenger:slave#connection')
const source = Symbol('messenger:slave#connection')

class PostMessenger extends BaseMessenger {
  constructor (options) {
    super(options)
    this[source] = null
    this[connection]()
  }

  [connection] () {
    const vm = this
    vm._onmessage(function ({ type, channel }) {
      if (type === 'connection' && channel === vm.channel) {
        vm[source] = this.source
      }
    })
  }

  _postMessage (type, data) {
    const master = this[source]
    if (!master) throw new Error('No Master Source, please connection first!')
    master.postMessage({ type, channel: this.channel, data }, master.origin)
  }
}

export default PostMessenger
