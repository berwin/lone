import { triggerEvent, callHook } from './component/helper'
import { createComponentInstance } from './index'

export default function (slave) {
  const instanceStorage = new Map()

  const MESSENGER_EVENTS_UI = {
    'ui:inited': function ({ name, id, propsData, parentListeners }) {
      const vm = createComponentInstance(name, id, { propsData, parentListeners, slave })
      instanceStorage.set(id, vm)
      callHook(vm, 'beforeMount')
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
    },
    'ui:updated': function ({ id, data }) {
      const vm = instanceStorage.get(id)
      callHook(vm, 'updated')
    }
  }

  for (const [event, fn] of Object.entries(MESSENGER_EVENTS_UI)) {
    slave.onmessage(event, fn)
  }
}
