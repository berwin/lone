import { Slave } from 'lone-messenger'

const viewStorage = new Map()
const slave = new Slave({ env: 'postMessage' })

const MESSENGER_EVENTS_LOGIC = {
  'logic:data': function ({ id, data }) {
    const view = viewStorage.get(id)
    console.log(view)
  },
  'view:navigateTo': function () {
    console.log('ui-schedule: view:navigateTo')
  }
}

for (const [event, fn] of Object.entries(MESSENGER_EVENTS_LOGIC)) {
  slave.onmessage(event, fn)
}

setTimeout(function () {
  slave.send('ui:inited', { name: 'test', id: 0 })
}, 1000)

setTimeout(function () {
  slave.send('ui:ready', { id: 0 })
}, 2000)
