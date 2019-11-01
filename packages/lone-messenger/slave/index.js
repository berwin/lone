import NativeMessenger from './native-messenger'
import PostMessenger from './post-messenger'
import WorkerMessenger from './worker-messenger'

const slaveMap = {
  postMessage: PostMessenger,
  native: NativeMessenger,
  worker: WorkerMessenger
}

export default new Proxy(class Slave {}, {
  construct (trapTarget, argumentList) {
    const options = argumentList[0]
    return Reflect.construct(
      slaveMap[options.env],
      argumentList
    )
  }
})
