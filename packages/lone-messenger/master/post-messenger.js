const source = Symbol('messenger:master#connection')

class PostMessenger {
  constructor (options) {
    this[source] = Object.create(null)
    this.mid = options.mid
    this.midRe = new RegExp('^' + this.mid)
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
    const vm = this
    window.addEventListener('message', function (evt) {
      if (evt.origin !== location.origin || !vm.midRe.test(evt.data.channel)) return
      fn.call(evt, evt.data)
    })
  }

  send (type, targetChannel, data, channel) {
    const slave = this[source][targetChannel]
    if (!slave) throw new Error('No Slave Source, please connection first!')
    slave.postMessage({ type, targetChannel, data, channel }, slave.origin)
  }
}

export default PostMessenger
