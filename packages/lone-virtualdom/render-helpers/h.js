import { h } from '../index'
import { isArray } from 'lone-util'

export default function (sel, a, b) {
  if (isArray(a)) a = normalizeArrayChildren(a)
  if (isArray(b)) b = normalizeArrayChildren(b)
  return h(sel, a, b)
}

function normalizeArrayChildren (children) {
  const res = []
  for (let i = 0, l = children.length; i < l; i++) {
    const child = children[i]
    if (isArray(child)) {
      res.push.apply(res, normalizeArrayChildren(child))
    } else {
      res.push(child)
    }
  }
  return res
}
