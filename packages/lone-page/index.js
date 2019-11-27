import Component from './component'

export default function (options) {
  const pid = window.frameElement.id
  const path = window.frameElement.getAttribute('path')
  const name = window.frameElement.getAttribute('component')
  Component.setGlobalOptions({ ...options, pid, path })
  return new Component({ name, el: document.getElementById('app') })
}
