/* @flow */

import { cached } from 'lone-util'
import { parseFilters } from './filter-parser'

const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g
// eslint-disable-next-line no-useless-escape
const regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g

const buildRegex = cached(delimiters => {
  const open = delimiters[0].replace(regexEscapeRE, '\\$&')
  const close = delimiters[1].replace(regexEscapeRE, '\\$&')
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
})

export function parseText (text, delimiters) {
  const tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE
  if (!tagRE.test(text)) {
    return
  }
  const tokens = []
  let lastIndex = tagRE.lastIndex = 0
  let match, index
  while ((match = tagRE.exec(text))) {
    index = match.index
    // 先把 {{ 双大括号前边的 text push 到 tokens 中
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)))
    }
    // tag token
    const exp = parseFilters(match[1].trim())
    tokens.push(`_s(${exp})`)
    lastIndex = index + match[0].length
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)))
  }
  return tokens.join('+')
}
