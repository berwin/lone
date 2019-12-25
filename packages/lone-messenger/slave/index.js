import NativeMessenger from './native-messenger'
import PostMessenger from './post-messenger'
import WorkerMessenger from './worker-messenger'

const slaveMap = {
  postMessage: PostMessenger,
  native: NativeMessenger,
  worker: WorkerMessenger
}

export default function (options) {
  return new slaveMap[options.env](options)
}
