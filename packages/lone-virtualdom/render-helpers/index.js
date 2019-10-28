/* @flow */

import { toNumber, toString, looseEqual, looseIndexOf } from 'lone-util'
import { createElement } from '../create-element'
import { createTextVNode, createEmptyVNode } from '../vnode'
import { renderList } from './render-list'
import { renderSlot } from './render-slot'
import { resolveFilter } from './resolve-filter'
import { checkKeyCodes } from './check-keycodes'
import { bindObjectProps } from './bind-object-props'
import { renderStatic, markOnce } from './render-static'
import { bindObjectListeners } from './bind-object-listeners'
import { resolveScopedSlots } from './resolve-scoped-slots'
import { bindDynamicKeys, prependModifier } from './bind-dynamic-keys'

export function installRenderHelpers (target) {
  const proto = target.prototype
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  proto._c = function (a, b, c, d) { return createElement(this, a, b, c, d, false) }
  // normalization is always applied for the public version, used in
  // user-written render functions.
  proto.$createElement = function (a, b, c, d) { return createElement(this, a, b, c, d, true) }
  proto._o = markOnce
  proto._n = toNumber
  proto._s = toString
  proto._l = renderList
  proto._t = renderSlot
  proto._q = looseEqual
  proto._i = looseIndexOf
  proto._m = renderStatic
  proto._f = resolveFilter
  proto._k = checkKeyCodes
  proto._b = bindObjectProps
  proto._v = createTextVNode
  proto._e = createEmptyVNode
  proto._u = resolveScopedSlots
  proto._g = bindObjectListeners
  proto._d = bindDynamicKeys
  proto._p = prependModifier
}
