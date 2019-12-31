import Schedule from './schedule'
import Router from './router'

let id = 0

class LoneUI {
  constructor (options) {
    this.options = options
    // ‘mid’, a shortened form of a Miniapp ID
    this.mid = options.mid || (Date.now() + '_' + id++)
    this.router = new Router({
      routes: this.options.routes,
      entry: this.options.entry,
      container: this.options.container || document.body,
      mid: this.mid
    })
    this.schedule = new Schedule({
      router: this.router,
      entry: this.options.entry,
      mid: this.mid
    })
  }
}

export default function (options) {
  return new LoneUI(options)
}
