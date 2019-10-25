/* @flow */

import {
  isPreTag,
  mustUseProp,
  isReservedTag,
  getTagNamespace
} from 'lone-util/web'

import modules from './modules/index'
import directives from './directives/index'
import { genStaticKeys, isUnaryTag, canBeLeftOpenTag } from 'lone-util'

export const baseOptions = {
  expectHTML: true,
  modules,
  directives,
  isPreTag,
  isUnaryTag,
  mustUseProp,
  canBeLeftOpenTag,
  isReservedTag,
  getTagNamespace,
  staticKeys: genStaticKeys(modules)
}
