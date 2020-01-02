import { initOptions, sendInitCommandToPageComponent, callHook } from './helper'
import initData from './state'
import events, { initEvents } from './events'
import router from './router'
import { notifyPropsObserver } from './observer'
import { looseEqual } from 'lone-util'
import { instanceStorage } from '../schedule'

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
    callHook(vm, 'onLoad')
    callHook(vm, 'onShow')
    sendInitCommandToPageComponent(vm)
  }

  setData (data) {
    const oldData = this.data
    this.data = Object.assign({}, oldData, data)
    if (looseEqual(oldData, this.data)) return
    notifyPropsObserver(this, oldData, this.data)
    this._slave.send('component:data', this._id, this.data)
  }

  $destroy () {
    const vm = this
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy')
    vm._isBeingDestroyed = true
    vm.data = null
    vm.$off()
    vm._slave.send('component:destroy', this._id, {})
    callHook(vm, 'destroyed')

    if (instanceStorage.has(vm._id)) {
      instanceStorage.delete(vm._id)
    }
  };
}

export default LogicComponent
