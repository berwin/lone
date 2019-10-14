const toString = Object.prototype.toString

export const isString = s => toString.call(s) === '[object String]'
export const isObject = o => toString.call(o) === '[object Object]'
export const isBoolean = b => toString.call(b) === '[object Boolean]'
export const isArray = a => toString.call(a) === '[object Array]'
export const isFunction = f => toString.call(f) === '[object Function]'

export function noop () {}
