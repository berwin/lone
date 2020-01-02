import { Slave } from 'lone-messenger'
import { compileToFunctions } from 'lone-compiler-dom'
import { patch } from 'lone-virtualdom'
import { resolveSlots } from './slot'
import { proxy } from 'lone-util'
import {
  initParentListener,
  initEventListener
} from './eventListener'

let cid = 0

export default function init (Component) {
  const proto = Component.prototype
  proto.init = function (options) {
    const vm = this
    initLifecycle(vm)
    initOptions(vm, options, Component)
    initMessenger(vm)
    initParentListener(vm)
    initRender(vm)
    vm.callHook('page:inited', { propsData: vm.propsData, parentListeners: Object.keys(vm._parentListeners) })
    reaction(vm)
    initHideChange(vm)
    initShowChange(vm)
    initDestroyRemoveNode(vm)
  }

  proto._setData = function (data) {
    const vm = this
    vm._data = data
    const keys = Object.keys(data)
    let i = keys.length
    while (i--) {
      const key = keys[i]
      proxy(vm, '_data', key)
    }
    const vnode = vm._render()
    vm._update(vnode)
  }

  proto._render = function () {
    const vm = this
    const render = this.options.render
    let vnode
    try {
      vnode = render.call(this)
    } catch (e) {
      console.error(e)
      vnode = vm._vnode
    }
    return vnode
  }

  proto._update = function (vnode) {
    const vm = this
    const oldVnode = this._vnode || this.options.el
    this._vnode = vnode
    if (vm._isMounted && !vm._isDestroyed) {
      vm.callHook('page:beforeUpdate')
    }
    vm.$el = patch(oldVnode, this._vnode)
    if (vm._isMounted && !vm._isDestroyed) {
      vm.callHook('page:updated')
    }
  }

  proto.callHook = function (hook, rest = {}) {
    const vm = this
    vm.slave.send(hook, vm.getLogicChannel(), { name: vm.name, id: vm.id, ...rest })
  }

  proto.updatePropsData = function (data) {
    const vm = this
    vm.propsData = data
    vm.slave.send('page:data', vm.getLogicChannel(), { id: vm.id, data })
  }
}

function initLifecycle (vm) {
  vm._isMounted = false
  vm._isDestroyed = false
}

function initOptions (vm, options, Component) {
  vm.options = options
  vm.cid = cid++
  vm.pid = Component.options.pid
  vm.mid = Component.options.mid
  vm.id = vm.mid + '_' + vm.pid + '_' + vm.cid
  const config = Component.options.components.find(item => item.name === vm.options.name)
  vm.name = config.name
  vm.template = config.template
  vm.propsData = options.propsData || {}
  vm.$slots = resolveSlots(options._renderChildren)
  vm.$official = !!config.official
}

function initMessenger (vm) {
  vm.slave = new Slave({ env: 'postMessage', channel: vm.id })

  vm.slave.onmessage('component:inited', function ({ data: initData = {}, methods = [] }) {
    initEventListener(vm, methods)
    vm.callHook('page:beforeMount')
    vm._setData(initData)
    vm._isMounted = true
    vm.callHook('page:ready')
  })
}

function initRender (vm) {
  const { render } = compileToFunctions(vm.template, undefined, vm)
  vm.options.render = render
}

function reaction (vm) {
  vm.slave.onmessage('component:data', function (data) {
    vm._setData(data)
  })
}

function initDestroyRemoveNode (vm) {
  vm.slave.onmessage('component:destroy', function (info) {
    vm.callHook = function () {}
  })
}

function initHideChange (vm) {
  document.addEventListener('onHide', function () {
    vm.callHook('page:hide', { pid: vm.pid })
  })
}

function initShowChange (vm) {
  document.addEventListener('onShow', function () {
    vm.callHook('page:show', { pid: vm.pid })
  })
}
