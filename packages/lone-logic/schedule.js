import { Slave } from 'lone-messenger'
import { callHook, createComponentInstance } from './component'
import { getChannel } from './helper'

export const instanceStorage = new Map()
export const slave = new Slave({ env: 'postMessage', channel: 'logic' })

const MESSENGER_EVENTS_UI = {
  'ui:inited': function ({ name, id }) {
    const vm = createComponentInstance(name, id)
    instanceStorage.set(id, vm)
    slave.send('logic:data', getChannel(id), { id, data: vm.data })
  },
  'ui:ready': function ({ id }) {
    const vm = instanceStorage.get(id)
    callHook(vm, 'onReady')
    callHook(vm, 'mounted')
  }
}

for (const [event, fn] of Object.entries(MESSENGER_EVENTS_UI)) {
  slave.onmessage(event, fn)
}
