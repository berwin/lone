import BaseMessenger from '../base/messenger'

import Native from './native-messenger'
import Post from './post-messenger'

const connection = Symbol('messenger:master#connection')

export default class Master extends BaseMessenger {
  constructor (options) {
    super()
    this.env = options.env
    this.native = new Native()
    this.post = new Post()
    this[connection]()
    this.listen()
  }

  [connection] () {
    if (this._isNative()) this.native.connection()
    this.post.connection()
  }

  listen () {
    this._onmessage(evt => {
      const cbs = this._messages[evt.type]
      if (!cbs) return
      let i = cbs.length
      while (i--) {
        cbs[i].call(evt, evt.channel, evt.data)
      }
    })
  }

  _onmessage (fn) {
    if (this._isNative()) this.native.onmessage(fn)
    this.post.onmessage(fn)
  }

  _postMessage (type, channel, data) {
    if (channel === 'logic' && this._isNative()) {
      return this.native.send(type, channel, data)
    }
    return this.post.send(type, channel, data)
  }

  _isNative () {
    return this.env !== 'postMessage'
  }
}
