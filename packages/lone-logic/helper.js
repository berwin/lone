import { LIFECYCLE_HOOKS } from 'lone-util/constants'
import { isArray, isFunction } from 'lone-util'
import { slave } from './schedule'

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

export function handleError (err, vm, info) {
  console.error(`[warn]: ${`Error in ${info}: "${err.toString()}"`}`)
}

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

export function sendInitCommandToPageComponent (vm) {
  const reservedWords = [...LIFECYCLE_HOOKS, 'data', 'methods']
  slave.send('component:inited', vm._id, {
    data: vm.data || {},
    methods: [...Object.keys(vm.$options).filter(key => !reservedWords.includes(key)), ...Object.keys(vm.$options.methods || {})]
  })
}

export function triggerEvent (vm, method, event) {
  const handler = vm.$options[method] || vm.$options.methods[method]
  try {
    handler.call(vm, event)
  } catch (e) {
    handleError(e, vm, `"${method}" event handler`)
  }
}
