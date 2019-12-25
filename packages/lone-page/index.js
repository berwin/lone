import logicMaster from 'lone-logic-master'
import Component from './component'

export default function (options) {
  const pid = window.frameElement.id
  const path = window.frameElement.getAttribute('path')
  const name = window.frameElement.getAttribute('component')
  Component.setGlobalOptions({ ...options, pid, path })
  logicMaster(Component.options)
  return new Component({ name, el: document.getElementById('app') })
}
