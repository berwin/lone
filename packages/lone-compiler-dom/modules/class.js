import {
  getAndRemoveAttr,
  getBindingAttr
} from 'lone-compiler-core/helpers'

function transformNode (el) {
  const classBinding = getBindingAttr(el, 'class', false /* getStatic */)
  if (classBinding) {
    el.classBinding = classBinding
  }
  const staticClass = getAndRemoveAttr(el, 'class')
  if (staticClass) {
    const kclass = staticClass.trim().split(' ').map(name => `'${name}':true`).join(',')
    el.classBinding = el.classBinding
      ? el.classBinding.substring(0, el.classBinding.length - 1) + kclass + '}'
      : `{${kclass}}`
  }
}

function genData (el) {
  let data = ''
  if (el.classBinding) {
    data += `class:${el.classBinding},`
  }
  return data
}

export default {
  transformNode,
  genData
}
