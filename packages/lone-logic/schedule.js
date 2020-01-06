import { triggerEvent, callHook } from './component/helper'
import { createComponentInstance } from './index'
import { parseSearch } from 'lone-util/url'

export default function (slave) {
  const instanceStorage = new Map()

  const MESSENGER_EVENTS_UI = {
    'page:inited': function ({ name, id, propsData, parentListeners, search }) {
      const vm = createComponentInstance(name, id, { propsData, parentListeners, slave, query: parseSearch(search) })
      instanceStorage.set(id, vm)
    },
    'page:ready': function ({ id }) {
      const vm = instanceStorage.get(id)
      callHook(vm, 'onReady')
      callHook(vm, 'mounted')
    },
    'page:triggerEvent': function ({ id, method, event }) {
      const vm = instanceStorage.get(id)
      triggerEvent(vm, method, event)
    },
    'page:data': function ({ id, data }) {
      const vm = instanceStorage.get(id)
      vm.setData(data)
    },
    'page:beforeMount': function ({ id }) {
      const vm = instanceStorage.get(id)
      callHook(vm, 'beforeMount')
    },
    'page:beforeUpdate': function ({ id }) {
      const vm = instanceStorage.get(id)
      callHook(vm, 'beforeUpdate')
    },
    'page:updated': function ({ id }) {
      const vm = instanceStorage.get(id)
      callHook(vm, 'updated')
    },
    'page:show': function ({ id }) {
      const vm = instanceStorage.get(id)
      callHook(vm, 'onShow')
    },
    'page:hide': function ({ id }) {
      const vm = instanceStorage.get(id)
      callHook(vm, 'onHide')
    },
    'page:destroyed': function ({ id }) {
      const vm = instanceStorage.get(id)
      callHook(vm, 'destroyed')
      instanceStorage.delete(id)
    }
  }

  for (const [event, fn] of Object.entries(MESSENGER_EVENTS_UI)) {
    slave.onmessage(event, fn)
  }
}
