import Messenger from './messenger'

class PostMessenger extends Messenger {
  _onmessage (fn) {
    window.addEventListener('message', function (evt) {
      if (evt.origin !== location.origin) return
      fn.call(evt, evt.data)
    })
  }
}

export default PostMessenger
