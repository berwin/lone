import { isReservedTag } from 'lone-util/web'
import Component from 'lone-page/component'

export default {
  create: function (oldVnode, vnode) {
    const isComponent = Component.options.components.find(component => component.name === vnode.sel)
    if (!isReservedTag(vnode.sel) && isComponent) {
      // eslint-disable-next-line
      new Component({ name: vnode.sel, el: vnode.elm })
    }
  }
}
