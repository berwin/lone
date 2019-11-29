import { isReservedTag } from 'lone-util/web'
import Component from 'lone-page/component'

export default {
  create: function (oldVnode, vnode) {
    if (!isReservedTag(vnode.sel) && isComponent(vnode.sel)) {
      const component = new Component({ name: vnode.sel, el: vnode.elm, propsData: vnode.data.attrs })
      vnode.elm.component = component
    }
  },
  update (oldVnode, vnode) {
    if (!isReservedTag(vnode.sel) && isComponent(vnode.sel)) {
      const oldAttrs = oldVnode.data.attrs
      const attrs = vnode.data.attrs
      if (!oldAttrs && !attrs) return
      if (JSON.stringify(oldAttrs) === JSON.stringify(attrs)) return
      const component = vnode.elm.component
      console.log(component)
    }
  }
}

function isComponent (name) {
  return Component.options.components.find(component => component.name === name)
}
