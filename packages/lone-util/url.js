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

// abc=123&abc=xyz
export function parseSearch (search) {
  search = search.replace('?', '')
  const sep = '&'
  const eq = '='
  const searchParams = Object.create(null)
  return search.split(sep).reduce((res, param) => {
    const [key, value] = param.split(eq)
    return { ...res, [key]: value }
  }, searchParams)
}
