class Messenger {
  constructor () {
    if (new.target === Messenger) {
      throw new TypeError('Messenger is only used for inheritance, not allowed to use directly.')
    }
    this._messages = Object.create(null)
    this._listen()
  }

  onmessage (type, fn) {
    (this._messages[type] || (this._messages[type] = [])).push(fn)
  }

  send (type, data) {
    this._postMessage(type, data)
  }

  _listen () {
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

export default new Proxy(Messenger, {
  apply () {
    throw new TypeError('Messenger is only used for inheritance, not allowed to use directly.')
  }
})
