import init from './init'

@init
class Component {
  constructor (options) {
    this.init(options)
  }

  static setGlobalOptions (options) {
    this.options = options
  }
}

export default Component
