import Messenger from './base'

class WorkerMessenger extends Messenger {
  constructor (options) {
    super()
    this.channel = options.channel
    this.listen()
  }

  _postMessage (type, targetChannel, data) {
    self.postMessage({ type, channel: this.channel, targetChannel, data })
  }

  _onmessage (fn) {
    self.onmessage = function (evt) {
      fn.call(evt, evt.data)
    }
  }
}

export default WorkerMessenger
