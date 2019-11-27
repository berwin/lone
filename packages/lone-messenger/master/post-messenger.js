const source = Symbol('messenger:master#connection')

class PostMessenger {
  constructor () {
    this[source] = Object.create(null)
  }

  connection () {
    const vm = this
    vm.onmessage(function ({ type, channel }) {
      if (type === 'connection') {
        vm[source][channel] = this.source
      }
    })
  }

  onmessage (fn) {
    window.addEventListener('message', function (evt) {
      if (evt.origin !== location.origin) return
      fn.call(evt, evt.data)
    })
  }

  send (type, channel, data) {
    const slave = this[source][channel]
    if (!slave) throw new Error('No Slave Source, please connection first!')
    slave.postMessage({ type, channel, data }, slave.origin)
  }
}

export default PostMessenger
