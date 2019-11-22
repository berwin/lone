import { toString } from 'lone-util'
import { h } from './index'
import { renderList } from './render-list'

export function installRenderHelpers (target) {
  const proto = target.prototype
  // createTextVNode
  proto._v = text => text
  // create Element Vnode
  proto._c = h
  proto._s = toString
  proto._l = renderList

  // target._o = markOnce
  // target._t = renderSlot
  // target._m = renderStatic
  // target._f = resolveFilter
  // target._k = checkKeyCodes
  // target._b = bindObjectProps
  // target._v = createTextVNode
  // target._e = createEmptyVNode
  // target._u = resolveScopedSlots
  // target._g = bindObjectListeners
}
