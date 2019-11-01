import Messenger from '../base/messenger'

class WorkerMessenger extends Messenger {
  constructor () {
    super()
    this.listen()
  }

  _postMessage (type, channel, data) {
    self.postMessage({ type, channel, data })
  }

  _onmessage (fn) {
    self.onmessage = function (evt) {
      fn.call(evt, evt.data)
    }
  }
}

export default WorkerMessenger
