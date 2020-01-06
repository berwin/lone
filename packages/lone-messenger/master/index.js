import Native from './native-messenger'
import Post from './post-messenger'
import WebWorker from './worker-messenger'
import { feedbackType } from 'lone-util'

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

  send (type, targetChannel, data) {
    this._postMessage(type, null, data, targetChannel)
  }

  listen () {
    this._onmessage(evt => {
      // 如果是中转信号，则直接转发至Slave（存在targetChannel的为中转信号，没有则表示发送给Master的信号）
      if (evt.targetChannel) return this._postMessage(evt.type, evt.targetChannel, evt.data, evt.channel)
      const cbs = this._messages[evt.type]
      if (!cbs) return
      let i = cbs.length
      while (i--) {
        Promise.resolve(cbs[i].call(evt, evt.channel, evt.data))
          .then(
            data => this._postMessage(feedbackType(evt.type), evt.channel, { data }),
            err => this._postMessage(feedbackType(evt.type), evt.channel, { err })
          )
      }
    })
  }

  _onmessage (fn) {
    if (this.options.env === 'native') this.native.onmessage(fn)
    if (this.options.env === 'worker') this.worker.onmessage(fn)
    this.post.onmessage(fn)
  }

  _postMessage (type, targetChannel, data, channel) {
    // Only developer component logic running under the sandbox
    if (targetChannel === 'logic-worker') {
      if (this.options.env === 'native') return this.native.send(type, data, channel)
      if (this.options.env === 'worker') return this.worker.send(type, data, channel)
    }
    return this.post.send(type, targetChannel, data, channel)
  }
}
