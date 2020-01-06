import { isArray } from './index'

export function parse (url) {
  const a = document.createElement('a')
  a.href = url
  return {
    hash: a.hash,
    host: a.host,
    hostname: a.hostname,
    href: a.href,
    origin: a.origin,
    password: a.password,
    pathname: a.pathname,
    port: a.port,
    protocol: a.protocol,
    search: a.search,
    username: a.username
  }
}

// parseSearch('abc=123&abc=xyz') => { abc: ['123', 'xyz'] }
export function parseSearch (search, sep = '&', eq = '=') {
  search = search.trim().replace(/^\?/, '').trim()
  const res = Object.create(null)
  if (search === '') return res
  return search.split(sep).reduce((res, param) => {
    const [key, value] = param.split(eq)
    if (!key) return res
    return {
      ...res,
      [key]: res[key]
        ? isArray(res[key])
          ? [...res[key], value]
          : [res[key], value]
        : value
    }
  }, res)
}
