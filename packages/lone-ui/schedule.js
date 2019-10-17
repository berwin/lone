import { Slave } from 'lone-messenger'
import { createPage } from './page'

const pageStack = []
const logicSlave = new Slave({ env: 'postMessage', channel: 'logic' })
const pageSlave = new Slave({ env: 'postMessage', channel: 'page' })

const LOGIC_EVENTS = {
  'logic:data': function ({ id, data }) {
    const view = pageStack[pageStack.length - 1]
    console.log('logic:data:', view, id, data)
  }
}

const PAGE_EVENTS = {
  'page:navigateTo': function () {
    const page = createPage()
    pageStack.push(page)
    console.log('ui-schedule: view:navigateTo')
  },
  'page:inited': function ({ name, id }) {
    logicSlave.send('ui:inited', { name, id })
  },
  'page:ready': function ({ id }) {
    logicSlave.send('ui:ready', { id })
  }
}

listenEvents(logicSlave, LOGIC_EVENTS)
listenEvents(pageSlave, PAGE_EVENTS)

function listenEvents (messenger, events) {
  for (const [event, fn] of Object.entries(events)) {
    messenger.onmessage(event, fn)
  }
}

PAGE_EVENTS['page:navigateTo']() // Test
