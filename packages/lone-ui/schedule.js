import { Master } from 'lone-messenger'
import { createPage } from './page'

const master = new Master({ env: 'postMessage' })

const LOGIC_EVENTS = {
  'logic:data': function (channel, { id, data }) {
    master.send('ui:data', channel, { id, data })
  }
}

const PAGE_EVENTS = {
  'page:navigateTo': function () {
    createPage()
    console.log('ui-schedule: view:navigateTo')
  },
  'page:inited': function (channel, { name, id }) {
    master.send('ui:inited', channel, { name, id })
  },
  'page:ready': function (channel, { id }) {
    master.send('ui:ready', channel, { id })
  }
}

listenEvents(master, LOGIC_EVENTS)
listenEvents(master, PAGE_EVENTS)

function listenEvents (messenger, events) {
  for (const [event, fn] of Object.entries(events)) {
    messenger.onmessage(event, fn)
  }
}
