import { installRenderHelpers } from 'lone-virtualdom/render-helpers'
import init from './init'

@installRenderHelpers
@init
class Component {
  constructor (options) {
    this.init(options)
  }

  static setGlobalOptions (options) {
    this.options = options
  }

  getLogicChannel () {
    return this.$official ? 'logic-' + this.pid : 'logic-worker'
  }
}

export default Component
