const customType = 'custom'

export function initParentListener (vm) {
  vm._parentListeners = Object.create(null)
  const listeners = vm.options._parentListeners
  if (listeners) {
    vm._parentListeners = listeners
  }
  vm.slave.onmessage('component:triggerParentEvent', function ({ name, data }) {
    vm._parentListeners[name]({ type: customType, data })
  })
}

export function initEventListener (vm, methods) {
  vm._eventListener = Object.create(null)
  let i = methods.length
  while (i--) {
    const method = methods[i]
    vm[method] = vm._eventListener[method] = function (event) {
      vm.slave.send('page:triggerEvent', vm.getLogicChannel(), {
        id: vm.id,
        event: event.type === customType
          ? event.data
          : getEvent(event),
        method
      })
    }
  }
}

function getEvent (event) {
  // Custom parameters
  if (!event.type && !event.timeStamp && !event.target) return event
  return {
    type: event.type,
    timeStamp: event.timeStamp,
    target: {
      value: event.target.value
    },
    detail: {
      x: event.x,
      y: event.y
    }
  }
}
