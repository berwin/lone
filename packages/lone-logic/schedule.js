import { Slave } from 'lone-messenger'
import { callHook, createComponentInstance } from './component'
import { triggerEvent } from './helper'

export const instanceStorage = new Map()
export const slave = new Slave({ env: 'worker', channel: 'logic' })

const MESSENGER_EVENTS_UI = {
  'ui:inited': function ({ name, id, propsData, parentListeners }) {
    const vm = createComponentInstance(name, id, { propsData, parentListeners })
    instanceStorage.set(id, vm)
  },
  'ui:ready': function ({ id }) {
    const vm = instanceStorage.get(id)
    callHook(vm, 'onReady')
    callHook(vm, 'mounted')
  },
  'ui:triggerEvent': function ({ id, method, event }) {
    const vm = instanceStorage.get(id)
    triggerEvent(vm, method, event)
  },
  'ui:data': function ({ id, data }) {
    const vm = instanceStorage.get(id)
    vm.setData(data)
  }
}

for (const [event, fn] of Object.entries(MESSENGER_EVENTS_UI)) {
  slave.onmessage(event, fn)
}

slave.send('logic:inited')
