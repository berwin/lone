import { init } from 'snabbdom'
import attrs from 'snabbdom/modules/attributes'
import cls from 'snabbdom/modules/class' // makes it easy to toggle classes
import props from 'snabbdom/modules/props' // for setting properties on DOM elements
import style from 'snabbdom/modules/style' // handles styling on elements with support for animations
import eventlisteners from 'snabbdom/modules/eventlisteners' // attaches event listeners
import createComponent from './create-component'

export const patch = init([
  attrs,
  cls,
  props,
  style,
  eventlisteners,
  createComponent
])

export { default as h } from 'snabbdom/h'
