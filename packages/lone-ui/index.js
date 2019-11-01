import Schedule from './schedule'
import Router from './router'

class LoneUI {
  constructor (options) {
    this.options = options
    this.router = new Router({
      routes: this.options.routes,
      entry: this.options.entry
    })
    this.schedule = new Schedule({
      router: this.router,
      entry: this.options.entry
    })
  }
}

export default function (options) {
  return new LoneUI(options)
}
