import logicMaster from 'lone-logic-master'
import Component from './component'

export default function (options) {
  const name = window.frameElement.getAttribute('component')
  const pid = window.frameElement.id
  const path = window.frameElement.getAttribute('path')
  const mid = window.frameElement.getAttribute('mid')
  Component.setGlobalOptions({ ...options, pid, path, mid })
  logicMaster(Component.options)
  return new Component({ name, el: document.getElementById('app') })
}
