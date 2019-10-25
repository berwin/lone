/* @flow */

import { addProp } from 'lone-compiler-core/helpers'

export default function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', `_s(${dir.value})`)
  }
}
