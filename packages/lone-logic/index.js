import Component from './component'
import { addComponent } from './schedule'

export default function (options) {
  const component = new Component(options)
  addComponent(component._id, component)
  return component
}
