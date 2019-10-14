import { Slave } from 'lone-messenger'

const slave = new Slave({
  env: 'postMessage'
})

slave.onmessage('customType', function (data) {
  console.log('ui:', data)
})

setTimeout(function () {
  slave.send('customType', { name: 'Berwin' })
}, 1000)

export default function () {
  console.log('ui')
}
