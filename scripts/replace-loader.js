const loaderUtils = require('loader-utils')

module.exports = function (source) {
  this.cacheable && this.cacheable()
  const query = loaderUtils.getOptions(this) || {}
  source = source.toString()
  Object.keys(query).forEach(function (key) {
    const reg = new RegExp(key, 'g')
    source = source.replace(reg, query[key])
  })
  return source
}

module.exports.raw = true
