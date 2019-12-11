/* @flow */

import { warn } from 'lone-util'

/**
 * Runtime helper for rendering <slot>
 */
export default function renderSlot (name, fallback, props, bindObject) {
  const slotNodes = this.$slots[name]
  // warn duplicate slot usage
  if (slotNodes) {
    slotNodes._rendered && warn(
      `Duplicate presence of slot "${name}" found in the same render tree ` +
      '- this will likely cause render errors.',
      this
    )
    slotNodes._rendered = true
  }
  return slotNodes || fallback
}
