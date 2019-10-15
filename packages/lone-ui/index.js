import { Slave } from 'lone-messenger'

const slave = new Slave({
  env: 'postMessage'
})

slave.onmessage('logic:data', function (data) {
  console.log('ui:', data)
})

setTimeout(function () {
  slave.send('ui:inited', { id: 0 })
}, 1000)

setTimeout(function () {
  slave.send('ui:ready', { id: 0 })
}, 2000)

export default function () {
  console.log('ui')
}
