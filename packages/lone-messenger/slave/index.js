import NativeMessenger from './native-messenger'
import PostMessenger from './post-messenger'

export default new Proxy(class Slave {}, {
  construct (trapTarget, argumentList) {
    const options = argumentList[0]
    return Reflect.construct(
      (options.env && options.env === 'postMessage')
        ? PostMessenger
        : NativeMessenger
      , argumentList
    )
  }
})
