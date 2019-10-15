import BaseMessenger from '../base/post-messenger'

const connection = Symbol('messenger:slave#connection')
const source = Symbol('messenger:slave#connection')

class PostMessenger extends BaseMessenger {
  constructor () {
    super()
    this[source] = null
    this[connection]()
  }

  [connection] () {
    const vm = this
    vm._onmessage(function (data) {
      if (data.type === 'connection') {
        vm[source] = this.source
      }
    })
  }

  _postMessage (type, data) {
    const master = this[source]
    master.postMessage({ type, data }, master.origin)
  }
}

export default PostMessenger
