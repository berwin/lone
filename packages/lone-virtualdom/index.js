import { init } from 'snabbdom'
import cls from 'snabbdom/modules/class' // makes it easy to toggle classes
import props from 'snabbdom/modules/props' // for setting properties on DOM elements
import style from 'snabbdom/modules/style' // handles styling on elements with support for animations
import eventlisteners from 'snabbdom/modules/eventlisteners' // attaches event listeners

export const patch = init([cls, props, style, eventlisteners])

export { default as h } from 'snabbdom/h'
