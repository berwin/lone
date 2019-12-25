class Messenger {
  constructor () {
    this._messages = Object.create(null)
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
        cbs[i].call(evt, evt.data)
      }
    })
  }

  _postMessage () {
    throw new TypeError('Subclass of Messenger doesn\'t provide the \'_postMessage\' method.')
  }

  _onmessage () {
    throw new TypeError('Subclass of Messenger doesn\'t provide the \'_onmessage\' method.')
  }
}

export default Messenger
