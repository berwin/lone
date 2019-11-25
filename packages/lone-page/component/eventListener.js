import { proxy } from 'lone-util'

export default function initEventListener (vm, methods) {
  vm._eventListener = Object.create(null)
  let i = methods.length
  while (i--) {
    vm._eventListener[methods[i]] = (function (method) {
      return function (event) {
        vm.slave.send('page:triggerEvent', 'logic', { id: vm.id, event: getEvent(event), method })
      }
    })(methods[i])
    proxy(vm, '_eventListener', methods[i])
  }
}

function getEvent (event) {
  return {
    type: event.type,
    timeStamp: event.timeStamp,
    target: {},
    detail: {
      x: event.x,
      y: event.y
    }
  }
}
