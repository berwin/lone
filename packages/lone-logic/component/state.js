import { isFunction } from 'lone-util'
import { handleError } from '../helper'

export default function initState (vm) {
  initProps(vm)
  initData(vm)
}

function initData (vm) {
  const data = vm.$options.data
  vm.data = isFunction(data)
    ? getData(data, vm)
    : data
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, 'data()')
    return {}
  }
}

function initProps (vm) {
  // ...
}
