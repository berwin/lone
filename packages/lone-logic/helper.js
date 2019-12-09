import { LIFECYCLE_HOOKS } from 'lone-util/constants'
import { isArray, isPlainObject, camelize } from 'lone-util'
import { slave } from './schedule'

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

export function warn (msg, vm) {
  console.error(`[${vm ? (vm.$options.name + ' ') : ''}warn]: ${msg}`)
}

export function handleError (err, vm, info) {
  console.error(`[warn]: ${`Error in ${info}: "${err.toString()}"`}`)
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
