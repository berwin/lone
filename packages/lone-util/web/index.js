import { warn } from '../index'

export * from './attrs'
export * from './class'
export * from './element'

/**
 * Query an element selector if it's not an element already.
 */
export function query (el) {
  if (typeof el === 'string') {
    const selected = document.querySelector(el)
    if (!selected) {
      warn(
        'Cannot find element: ' + el + '. Used body instead!'
      )
      return document.body
    }
    return selected
  } else {
    return el
  }
}
