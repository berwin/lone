import { LIFECYCLE_HOOKS } from 'lone-util/constants'
import { warn, handleError, isArray, isPlainObject, camelize, toArray } from 'lone-util'

export function initOptions (options) {
  normalizeHooks(options)
  normalizePropsData(options)
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

function normalizePropsData (options) {
  const props = options.props
  const res = {}
  let i, val, name
  if (isArray(props)) {
    i = props.length
    while (i--) {
      val = props[i]
      if (typeof val === 'string') {
        name = camelize(val)
        res[name] = { type: null }
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.')
      }
    }
  } else if (isPlainObject(props)) {
    for (const key in props) {
      val = props[key]
      name = camelize(key)
      res[name] = isPlainObject(val)
        ? val
        : { type: val }
    }
  }
  options.props = res
}

export function sendInitCommandToPageComponent (vm) {
  const reservedWords = [...LIFECYCLE_HOOKS, 'data', 'methods', 'slave', 'name', 'propsData', 'parentListeners', 'props']
  vm._slave.send('component:inited', vm._id, {
    data: vm.data || {},
    methods: [...Object.keys(vm.$options).filter(key => !reservedWords.includes(key)), ...Object.keys(vm.$options.methods || {})]
  })
  vm._inited = true
}

export function triggerEvent (vm, method, event) {
  const handler = vm.$options[method] || vm.$options.methods[method]
  try {
    handler.call(vm, event)
  } catch (e) {
    handleError(e, vm, `"${method}" event handler`)
  }
}

export function callHook (vm, hook) {
  const handlers = vm.$options[hook]
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].apply(vm, toArray(arguments, 2))
      } catch (e) {
        handleError(e, vm, `${hook} hook`)
      }
    }
  }
  vm.$emit('hook:' + hook)
}
