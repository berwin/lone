import { isFunction, isArray, hyphenate } from 'lone-util'
import { handleError, warn } from '../helper'

export default function initState (vm) {
  vm.data = Object.create(null)
  initProps(vm)
  initData(vm)
}

function initData (vm) {
  const rawData = vm.$options.data
  const data = isFunction(rawData)
    ? getData(rawData, vm)
    : rawData
  for (const name in data) {
    if (name in vm.data) {
      warn('"data.' + name + '": already exists, Props and data are not recommended to have the same name', vm)
    }
    if (!(name in vm.data)) {
      vm.data[name] = data[name]
    }
  }
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
  const propsOptions = vm.$options.props
  if (!propsOptions) return
  for (const key in propsOptions) {
    const propsData = vm.$options.propsData
    const value = validateProp(key, propsOptions, propsData, vm)
    vm.data[key] = value
  }
}

function validateProp (key, propsOptions, propsData, vm) {
  const prop = propsOptions[key]
  const absent = !(key in propsData)
  let value = propsData[key]
  if (isType(Boolean, prop.type)) {
    if (absent && !('default' in prop)) { // absent = false
      value = false
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) { // '' = true
      value = true
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key)
  }
  assertProp(prop, key, value, vm, absent)
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!('default' in prop)) {
    return undefined
  }
  const def = prop.default
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

function assertProp (prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm)
    return undefined
  }

  if (value == null && !prop.required) {
    return undefined
  }

  let type = prop.type
  let valid = !type || type === true
  if (type) {
    if (!isArray(type)) {
      type = [type]
    }
    for (let i = 0; i < type.length && !valid; i++) {
      const toString = Object.prototype.toString
      valid = toString.call(value) === toString.call(type[i]())
    }
  }
  if (!valid) {
    warn(
      `Invalid prop: type check failed for prop "${name}".`,
      vm
    )
    return undefined
  }
  const validator = prop.validator
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      )
    }
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (let i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  return false
}
