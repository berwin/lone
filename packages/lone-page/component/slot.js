export function resolveSlots (children) {
  const slots = {}
  if (!children) {
    return slots
  }
  const defaultSlot = []
  for (let i = 0, l = children.length; i < l; i++) {
    const child = children[i]
    const data = child.data
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot
    }
    if (data && data.slot != null) {
      const name = child.data.slot
      const slot = (slots[name] || (slots[name] = []))
      slot.push(child)
    } else {
      defaultSlot.push(child)
    }
  }
  // ignore whitespace
  if (!defaultSlot.every(isWhitespace)) {
    slots.default = defaultSlot
  }
  return slots
}

function isWhitespace (node) {
  return node.text === ' '
}
