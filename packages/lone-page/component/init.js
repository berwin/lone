import { Slave } from 'lone-messenger'

let cid = 0

export default function init (Component) {
  const proto = Component.prototype
  proto.init = function (options) {
    const vm = this
    initOptions(vm, options, Component)
    initMessenger(vm)
    vm.callHook(vm, 'page:inited')
    reaction(vm)
    vm.callHook(vm, 'page:ready')
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

function reaction (vm) {
  vm.slave.onmessage('ui:data', function ({ id, data }) {
    console.log('ui:data - page:', id, data)
  })
}
