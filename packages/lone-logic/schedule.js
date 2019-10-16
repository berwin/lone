import { Master } from 'lone-messenger'
import { callHook, createComponentInstance } from './component'

export const instanceStorage = new Map()
export const master = new Master({ env: 'postMessage' })

const MESSENGER_EVENTS_UI = {
  'ui:inited': function ({ name, id }) {
    const vm = createComponentInstance(name, id)
    instanceStorage.set(id, vm)
    master.send('logic:data', { id, data: vm.data })
  },
  'ui:ready': function ({ id }) {
    const vm = instanceStorage.get(id)
    callHook(vm, 'onReady')
    callHook(vm, 'mounted')
  }
}

for (const [event, fn] of Object.entries(MESSENGER_EVENTS_UI)) {
  master.onmessage(event, fn)
}
