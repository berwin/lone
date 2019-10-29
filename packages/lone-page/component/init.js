import { Slave } from 'lone-messenger'
import { compileToFunctions } from 'lone-compiler-dom'
import { patch } from 'lone-virtualdom'
import { proxy } from 'lone-util'

let cid = 0

export default function init (Component) {
  const proto = Component.prototype
  proto.init = function (options) {
    const vm = this
    initOptions(vm, options, Component)
    initMessenger(vm)
    initRender(vm)
    vm.callHook(vm, 'page:inited')
    reaction(vm)
    vm.callHook(vm, 'page:ready')
  }

  proto._render = function () {
    const vm = this
    const render = this.options.render
    let vnode
    console.log(render)
    try {
      vnode = render.call(this)
    } catch (e) {
      console.log(e)
      vnode = vm._vnode
    }
    return vnode
  }

  proto._update = function (vnode) {
    const oldVnode = this._vnode || document.getElementById('app')
    this._vnode = vnode
    patch(oldVnode, this._vnode)
  }

  proto.callHook = function (vm, hook) {
    vm.slave.send(hook, 'logic', { name: vm.name, id: vm.id })
  }
}

function initOptions (vm, options, Component) {
  vm.options = options
  vm.cid = cid++
  vm.pid = Component.options.pid
  vm.id = vm.pid + '_' + vm.cid
  const config = Component.options.components.find(item => item.name === vm.options.name)
  vm.name = config.name
  vm.template = config.template
}

function initMessenger (vm) {
  vm.slave = new Slave({ env: 'postMessage', channel: vm.pid })
}

function initRender (vm) {
  const { render } = compileToFunctions(vm.template, undefined, vm)
  vm.options.render = render
}

function reaction (vm) {
  vm.slave.onmessage('ui:data', function ({ id, data }) {
    vm._data = data
    const keys = Object.keys(data)
    let i = keys.length
    while (i--) {
      const key = keys[i]
      proxy(vm, '_data', key)
    }
    console.log('ui:data - page:', id, data)
    const vnode = vm._render()
    vm._update(vnode)
  })
}
