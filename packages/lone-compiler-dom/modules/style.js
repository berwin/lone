/* @flow */

import { parseText } from 'lone-compiler-core/parser/text-parser'
import { parseStyleText } from 'lone-util/web/style'
import {
  getAndRemoveAttr,
  getBindingAttr,
  baseWarn
} from 'lone-compiler-core/helpers'

function transformNode (el, options) {
  const warn = options.warn || baseWarn
  const styleBinding = getBindingAttr(el, 'style', false /* getStatic */)
  if (styleBinding) {
    el.styleBinding = styleBinding
  }

  const staticStyle = getAndRemoveAttr(el, 'style')
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      const expression = parseText(staticStyle, options.delimiters)
      if (expression) {
        warn(
          `style="${staticStyle}": ` +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        )
      }
    }
    el.styleBinding = el.styleBinding
      ? el.styleBinding.substring(0, el.styleBinding.length - 1) + ',' + JSON.stringify(parseStyleText(staticStyle)).substring(1)
      : JSON.stringify(parseStyleText(staticStyle))
  }
}

function genData (el) {
  let data = ''
  if (el.styleBinding) {
    data += `style:(${el.styleBinding}),`
  }
  return data
}

export default {
  staticKeys: ['staticStyle'],
  transformNode,
  genData
}
