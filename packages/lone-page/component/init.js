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
    reaction(vm)
    listenVisibilityChange(vm)
    listenDestroy(vm)
    vm.callHook('page:inited', {
      propsData: vm.propsData,
      parentListeners: Object.keys(vm._parentListeners),
      search: vm.search
    })
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
    patch(oldVnode, this._vnode)
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
  vm.mid = Component.options.mid
  vm.pid = Component.options.pid
  vm.cid = cid++
  vm.id = vm.mid + '_' + vm.pid + '_' + vm.cid
  vm.pathname = Component.options.pathname
  vm.search = Component.options.search
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

function listenVisibilityChange (vm) {
  const data = { pid: vm.pid }
  vm._onHide = _ => vm.callHook('page:hide', data)
  vm._onShow = _ => vm.callHook('page:show', data)
  document.addEventListener('onHide', vm._onHide)
  document.addEventListener('onShow', vm._onShow)
}

function listenDestroy (vm) {
  vm.slave.onmessage('component:destroy', function () {
    unlistenVisibilityChange(vm)
    patch((vm._vnode || vm.options.el), vm._c('!'))
    vm.callHook('page:destroyed')
  })
}

function unlistenVisibilityChange (vm) {
  document.removeEventListener('onHide', vm._onHide)
  document.removeEventListener('onShow', vm._onShow)
}
