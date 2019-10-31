class WorkerMessenger {
  connection (source) {
    this.source = source
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
