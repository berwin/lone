import { triggerEvent, callHook } from './component/helper'
import { createComponentInstance } from './index'

export default function (slave) {
  const instanceStorage = new Map()

  const MESSENGER_EVENTS_UI = {
    'ui:inited': function ({ name, id, propsData, parentListeners }) {
      const vm = createComponentInstance(name, id, { propsData, parentListeners, slave })
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
    },
    'ui:beforeMount': function ({ id }) {
      const vm = instanceStorage.get(id)
      callHook(vm, 'beforeMount')
    },
    'ui:beforeUpdate': function ({ id }) {
      const vm = instanceStorage.get(id)
      callHook(vm, 'beforeUpdate')
    },
    'ui:updated': function ({ id }) {
      const vm = instanceStorage.get(id)
      callHook(vm, 'updated')
    },
    'ui:show': function ({ id }) {
      const vm = instanceStorage.get(id)
      callHook(vm, 'onShow')
    },
    'ui:hide': function ({ id }) {
      const vm = instanceStorage.get(id)
      callHook(vm, 'onHide')
    },
    'ui:destroy': function ({ id }) {
      const vm = instanceStorage.get(id)
      vm.$destroy()
    }
  }

  for (const [event, fn] of Object.entries(MESSENGER_EVENTS_UI)) {
    slave.onmessage(event, fn)
  }
}
