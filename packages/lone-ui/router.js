import { createPage, removePage } from './page'
import { parse } from 'lone-util/url'

const init = Symbol('init')
const getRoute = Symbol('getRoute')

class Router {
  constructor (options) {
    this.stack = []
    this.routes = options.routes
    this[init]()
  }

  [init] () {
    this.navigateTo(this.routes[0].path)
  }

  [getRoute] (url) {
    const { pathname } = parse(url)
    return this.routes.find(item => {
      return item.path === pathname
    })
  }

  currentPage () {
    return this.stack[this.stack.length - 1] || null
  }

  currentPages () {
    return this.stack
  }

  _push (url) {
    const route = this[getRoute](url)
    const view = createPage(route)
    this.stack.push(view)
    return view
  }

  _pop () {
    const oldView = this.stack.pop()
    removePage(oldView)
  }

  navigateTo (url) {
    this._push(url)
  }

  redirectTo (url) {
    this._pop()
    this._push(url)
  }

  // 如果 delta 大于现有页面数，则返回到首页。
  navigateBack (delta = 1) {
    const len = this.stack.length
    if (delta >= len) delta = (len - 1)
    while (delta--) {
      this._pop()
    }
  }
}

export default Router
