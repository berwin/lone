import { initOptions, handleError, sendInitCommandToPageComponent } from '../helper'
import initData from './state'
import events, { initEvents } from './events'
import router from './router'
import { slave } from '../schedule'

const componentStorage = new Map()
const init = Symbol('lone-logic:init')

@events
@router
class LogicComponent {
  constructor (id, options) {
    const vm = this
    vm._id = id
    vm[init](options)
  }

  [init] (options) {
    const vm = this
    vm._events = Object.create(null)
    vm.$options = initOptions(options)
    initEvents(vm)
    callHook(vm, 'beforeCreate')
    initData(vm)
    callHook(vm, 'created')
    sendInitCommandToPageComponent(vm)
  }

  setData (data) {
    const oldData = this.data
    this.data = Object.assign(oldData, data)
    slave.send('component:data', this._id, this.data)
  }
}

export default function Component (name, options) {
  componentStorage.set(name, options)
}

export function createComponentInstance (name, id, otherOptions) {
  const options = Object.assign(
    componentStorage.get(name),
    otherOptions
  )
  options.name = name
  return new LogicComponent(id, options)
}

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
  vm.$emit('hook:' + hook)
}
