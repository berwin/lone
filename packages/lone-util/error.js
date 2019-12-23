import { inWorker } from './env'

export function handleError (err, vm, info) {
  // show friendly error log
  warn(`Error in ${info}: "${err.toString()}"`, vm)
  /* istanbul ignore else */
  // show error stack log
  if (inWorker && typeof console !== 'undefined') {
    console.error(err)
  } else {
    throw err
  }
}

const hasConsole = typeof console !== 'undefined'
const classifyRE = /(?:^|[-_])(\w)/g
const classify = str =>
  str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '')

export function warn (msg, vm) {
  const trace = vm ? generateComponentTrace(vm) : ''

  if (hasConsole) {
    console.error(`[Lone warn]: ${msg}${trace}`)
  }
}

export function tip (msg, vm) {
  const trace = vm ? generateComponentTrace(vm) : ''

  if (hasConsole) {
    console.warn(`[Lone tip]: ${msg}${trace}`)
  }
}

export function formatComponentName (vm) {
  const name = vm.$options.name

  return (name ? `<${classify(name)}>` : '<Anonymous>')
}

export function generateComponentTrace (vm) {
  return `\n\n(found in ${formatComponentName(vm)})`
}
