import { Slave } from 'lone-messenger'

const pid = window.frameElement.id
const slave = new Slave({ env: 'postMessage', channel: pid })

slave.onmessage('ui:data', function ({ id, data }) {
  console.log('ui:data - page:', id, data)
})

setTimeout(function () {
  slave.send('page:inited', 'logic', { name: 'test', id: pid + '_0' })
}, 1000)

setTimeout(function () {
  slave.send('page:ready', 'logic', { id: pid + '_0' })
}, 2000)

export default function (options) {
  console.log('lone-page:', options)
}
