import { toString, looseIndexOf, looseEqual } from 'lone-util'
import h from './h'
import renderList from './render-list'
import renderSlot from './render-slot'

export function installRenderHelpers (target) {
  const proto = target.prototype
  // createTextVNode
  proto._v = text => text
  // create Element Vnode
  proto._c = h
  proto._s = toString
  proto._l = renderList
  proto._t = renderSlot
  proto._i = looseIndexOf
  proto._q = looseEqual

  // target._o = markOnce
  // target._m = renderStatic
  // target._f = resolveFilter
  // target._k = checkKeyCodes
  // target._b = bindObjectProps
  // target._v = createTextVNode
  // target._e = createEmptyVNode
  // target._u = resolveScopedSlots
  // target._g = bindObjectListeners
}
