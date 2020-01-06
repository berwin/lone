import { feedbackType } from 'lone-util'

class Messenger {
  constructor () {
    this._messages = Object.create(null)
  }

  onmessage (type, fn) {
    (this._messages[type] || (this._messages[type] = [])).push(fn)
  }

  send (type, channel, data) {
    const vm = this
    return new Promise(function (resolve, reject) {
      vm._postMessage(type, channel, data)
      vm.onmessage(feedbackType(type), function ({ err, data }) {
        vm._messages[feedbackType(type)] = []
        return err
          ? reject(err)
          : resolve(data)
      })
    })
  }

  listen () {
    const vm = this
    vm._onmessage(evt => {
      const cbs = vm._messages[evt.type]
      if (!cbs) return
      let i = cbs.length
      while (i--) {
        Promise.resolve(cbs[i].call(evt, evt.data))
          .then(
            data => vm._postMessage(feedbackType(evt.type), evt.channel, { data }),
            err => vm._postMessage(feedbackType(evt.type), evt.channel, { err })
          )
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
