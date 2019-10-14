import { LIFECYCLE_HOOKS } from 'lone-util/constants'
import { isArray, isFunction } from 'lone-util'

export function initOptions (options) {
  normalizeHooks(options)
  return options
}

function normalizeHooks (options) {
  for (const key in options) {
    if (LIFECYCLE_HOOKS.includes(key)) {
      options[key] = isArray(options[key])
        ? options[key]
        : [options[key]]
    }
  }
}

export function handleError () {}

export function initData (vm) {
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
