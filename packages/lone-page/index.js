import logicMaster from 'lone-logic-master'
import Component from './component'

export default function (options) {
  const mid = window.frameElement.getAttribute('mid')
  const pid = window.frameElement.id
  const pathname = window.frameElement.getAttribute('pathname')
  const search = window.frameElement.getAttribute('search')
  const name = window.frameElement.getAttribute('component')
  Component.setGlobalOptions({ ...options, mid, pid, pathname, search })
  logicMaster(Component.options)
  return new Component({ name, el: document.getElementById('app') })
}
