class WorkerMessenger {
  constructor (options) {
    this.worker = options.worker
  }

  connection () {
    this.source = this.worker
  }

  onmessage (fn) {
    this.source.onmessage = function (evt) {
      fn.call(evt, evt.data)
    }
  }

  send (type, data) {
    this.source.postMessage({ type, data })
  }
}

export default WorkerMessenger
