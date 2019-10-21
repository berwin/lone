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
