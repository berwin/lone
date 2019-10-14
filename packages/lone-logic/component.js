import { initOptions, handleError, initData } from './helper'
import events from './events'
const init = Symbol('lone-logic:init')

let id = 0

@events
class LogicComponent {
  constructor (options) {
    const vm = this
    vm._id = id++
    vm[init](options)
    console.log(vm)
  }

  [init] (options) {
    const vm = this
    vm.$options = initOptions(options)
    callHook(vm, 'beforeCreate')
    vm._events = Object.create(null)
    initData(vm)
    callHook(vm, 'created')
  }

  setData (data, cb) {}
}

export default LogicComponent

export function callHook (vm, hook) {
  const handlers = vm.$options[hook]
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm)
      } catch (e) {
        handleError(e, vm, `${hook} hook`)
      }
    }
  }
  // vm.$emit('hook:' + hook)
}
