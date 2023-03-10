import { initOptions, sendInitCommandToPageComponent, callHook } from './helper'
import initData from './state'
import events, { initEvents } from './events'
import router from './router'
import { notifyPropsObserver } from './observer'
import { looseEqual } from 'lone-util'

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
    vm._inited = false
    vm.$options = initOptions(options)
    vm._slave = vm.$options.slave
    initEvents(vm)
    callHook(vm, 'beforeCreate')
    initData(vm)
    sendInitCommandToPageComponent(vm)
    callHook(vm, 'created')
    callHook(vm, 'onLoad', vm.$options.query)
    callHook(vm, 'onShow')
  }

  setData (data) {
    const oldData = this.data
    this.data = Object.assign({}, oldData, data)
    if (looseEqual(oldData, this.data)) return
    notifyPropsObserver(this, oldData, this.data)
    if (!this._inited) return
    this._slave.send('component:data', this._id, this.data)
  }

  $destroy () {
    const vm = this
    if (vm._isBeingDestroyed) return
    callHook(vm, 'beforeDestroy')
    vm._isBeingDestroyed = true
    vm.data = Object.create(null)
    vm.$off()
    vm._slave.send('component:destroy', this._id)
  }
}

export default LogicComponent
