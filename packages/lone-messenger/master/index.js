import Native from './native-messenger'
import Post from './post-messenger'
import WebWorker from './worker-messenger'

const connection = Symbol('messenger:master#connection')

export default class Master {
  constructor (options) {
    this._messages = Object.create(null)
    this.options = options
    this.native = new Native(options)
    this.post = new Post(options)
    this.worker = new WebWorker(options)
    this[connection]()
    this.listen()
  }

  [connection] () {
    if (this.options.env === 'native') this.native.connection()
    if (this.options.env === 'worker') this.worker.connection()
    this.post.connection()
  }

  onmessage (type, fn) {
    (this._messages[type] || (this._messages[type] = [])).push(fn)
  }

  send (type, channel, data) {
    this._postMessage(type, channel, data)
  }

  listen () {
    this._onmessage(evt => {
      const cbs = this._messages[evt.type]
      if (!cbs) return
      let i = cbs.length
      while (i--) {
        cbs[i].call(evt, evt.targetChannel, evt.data)
      }
    })
  }

  _onmessage (fn) {
    if (this.options.env === 'native') this.native.onmessage(fn)
    if (this.options.env === 'worker') this.worker.onmessage(fn)
    this.post.onmessage(fn)
  }

  _postMessage (type, channel, data) {
    // Only developer component logic running under the sandbox
    if (channel === 'logic-worker') {
      if (this.options.env === 'native') return this.native.send(type, data)
      if (this.options.env === 'worker') return this.worker.send(type, data)
    }
    return this.post.send(type, channel, data)
  }
}
