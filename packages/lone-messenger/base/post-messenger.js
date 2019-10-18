import Messenger from './messenger'

class PostMessenger extends Messenger {
  constructor () {
    super()
    this.listen()
  }

  _onmessage (fn) {
    window.addEventListener('message', function (evt) {
      fn.call(evt, evt.data)
    })
  }
}

export default PostMessenger
