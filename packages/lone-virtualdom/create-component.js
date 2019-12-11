import { isReservedTag } from 'lone-util/web'
import Component from 'lone-page/component'

export default {
  create: function (oldVnode, vnode) {
    if (!isReservedTag(vnode.sel) && isComponent(vnode.sel)) {
      const { attrs, on } = vnode.data
      const component = new Component({
        name: vnode.sel,
        el: vnode.elm,
        propsData: attrs,
        _parentListeners: on,
        _renderChildren: vnode.children
      })
      vnode.elm.component = component
    }
  },
  update (oldVnode, vnode) {
    if (!isReservedTag(vnode.sel) && isComponent(vnode.sel)) {
      const oldAttrs = oldVnode.data.attrs
      const attrs = vnode.data.attrs
      const component = vnode.elm.component
      if ((oldAttrs || attrs) && JSON.stringify(oldAttrs) !== JSON.stringify(attrs)) {
        component.updatePropsData(attrs, oldAttrs)
      }
    }
  }
}

function isComponent (name) {
  return Component.options.components.find(component => component.name === name)
}
