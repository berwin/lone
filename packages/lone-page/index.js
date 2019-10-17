import { Master } from 'lone-messenger'

const master = new Master({ env: 'postMessage', channel: 'page' })

setTimeout(function () {
  master.send('page:inited', { name: 'test', id: 0 })
}, 1000)

setTimeout(function () {
  master.send('page:ready', { id: 0 })
}, 2000)
