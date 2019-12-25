export function handleError (err, vm, info) {
  warn(`Error in ${info}: "${err.toString()}"`, vm, err)
}

const hasConsole = typeof console !== 'undefined'
const classifyRE = /(?:^|[-_])(\w)/g
const classify = str =>
  str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '')

export function warn (msg, vm, err) {
  const trace = vm ? generateComponentTrace(vm) : ''
  const hasErr = err

  if (!err) {
    err = err || { toString () { return this.name + this.message } }
  }

  err.name = '[Lone warn]'
  err.message = ` ${msg}${trace}`

  if (hasConsole) {
    console.error(hasErr ? err : String(err))
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
