import { Master } from 'lone-messenger'
import { callHook } from './component'

export const componentStorage = new Map()
export const master = new Master({ env: 'postMessage' })

export function addComponent (id, component) {
  componentStorage.set(id, component)
}

const MESSENGER_EVENTS_UI = {
  'ui:inited': function ({ id }) {
    const vm = componentStorage.get(id)
    master.send('logic:data', { id, data: vm.data })
  },
  'ui:ready': function ({ id }) {
    const vm = componentStorage.get(id)
    callHook(vm, 'onReady')
    callHook(vm, 'mounted')
  }
}

for (const [event, fn] of Object.entries(MESSENGER_EVENTS_UI)) {
  master.onmessage(event, fn)
}
