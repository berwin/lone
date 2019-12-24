import { initOptions, sendInitCommandToPageComponent, callHook } from './helper'
import initData from './state'
import events, { initEvents } from './events'
import router from './router'
import { notifyPropsObserver } from './observer'

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
    vm._slave = vm.$options.slave
    initEvents(vm)
    callHook(vm, 'beforeCreate')
    initData(vm)
    callHook(vm, 'created')
    sendInitCommandToPageComponent(vm)
  }

  setData (data) {
    const oldData = this.data
    this.data = Object.assign({}, oldData, data)
    notifyPropsObserver(this, oldData, this.data)
    this._slave.send('component:data', this._id, this.data)
  }
}

export default LogicComponent
