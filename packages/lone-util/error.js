import { noop } from '.'
import { inWorker } from './env'

export let warn = noop
export let tip = noop
export let formatComponentName = noop
export let generateComponentTrace = noop

export function handleError (err, vm, info) {
  // FIXME: errorCaptured
  if (process.env.NODE_ENV !== 'production') {
    warn(`Error in ${info}: "${err.toString()}"`, vm)
  }
  /* istanbul ignore else */
  if (inWorker && typeof console !== 'undefined') {
    console.error(err)
  } else {
    throw err
  }
}

if (process.env.NODE_ENV !== 'production') {
  const hasConsole = typeof console !== 'undefined'
  const classifyRE = /(?:^|[-_])(\w)/g
  const classify = str =>
    str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '')

  warn = (msg, vm) => {
    const trace = vm ? generateComponentTrace(vm) : ''

    if (hasConsole) {
      console.error(`[Lone warn]: ${msg}${trace}`)
    }
  }

  tip = (msg, vm) => {
    const trace = vm ? generateComponentTrace(vm) : ''

    if (hasConsole) {
      console.warn(`[Lone tip]: ${msg}${trace}`)
    }
  }

  formatComponentName = vm => {
    const name = vm.$options.name

    return (name ? `<${classify(name)}>` : '<Anonymous>')
  }

  generateComponentTrace = vm => {
    return `\n\n(found in ${formatComponentName(vm)})`
  }
}
