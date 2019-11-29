import { isArray } from 'lone-util'
import { handleError } from '../helper'

export default function events (Lone) {
  const proto = Lone.prototype
  proto.$on = on
  proto.$once = once
  proto.$off = off
  proto.$emit = emit
}

function on (event, fn) {
  const vm = this
  if (isArray(event)) {
    for (let i = 0, len = event.length; i < len; i++) {
      vm.$on(event[i], fn)
    }
  } else {
    // eslint-disable-next-line
    (vm._events[event] || (vm._events[event] = [])).push(fn)
  }
}

function once (event, fn) {
  const vm = this
  function on () {
    vm.$off(event, on)
    fn.apply(vm, arguments)
  }
  on.fn = fn
  vm.$on(event, on)
}

function off (event, fn) {
  const vm = this
  if (!arguments.length) {
    vm._events = Object.create(null)
    return vm
  }
  if (isArray(event)) {
    for (let i = 0, len = event.length; i < len; i++) {
      vm.$off(event[i], fn)
    }
    return vm
  }
  const fns = vm._events[event]
  if (!fns) return vm
  if (arguments.length === 1) {
    vm._events[event] = null
  }
  if (fns) {
    let i = fns.length
    while (i--) {
      if (fns[i] === fn || fns[i].fn === fn) {
        fns.splice(i, 1)
      }
    }
  }
  return vm
}

function emit (event) {
  const vm = this
  const events = vm._events[event]
  const slice = Array.prototype.slice
  if (events) {
    const args = slice.call(arguments, 1)
    for (let i = 0, len = events.length; i < len; i++) {
      try {
        events[i].apply(vm, args)
      } catch (e) {
        handleError(e, vm, `event handler for "${event}"`)
      }
    }
  }
  return vm
}
