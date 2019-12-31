import { createPage, removePage } from './page'
import { parse } from 'lone-util/url'
import { query } from 'lone-util/web'

const getRoute = Symbol('getRoute')

class Router {
  constructor (options) {
    this.stack = []
    this.routes = options.routes
    this.entry = options.entry
    this.container = query(options.container)
    this.mid = options.mid
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

  _handleHideEventListener () {
    const currentPage = this.currentPage()
    if (currentPage) {
      var hidechange = new Event('hidechange')
      currentPage.contentDocument.dispatchEvent(hidechange)
    }
  }

  _handleShowEventListener () {
    const currentPage = this.currentPage()
    if (currentPage) {
      var showchange = new Event('showchange')
      currentPage.contentDocument.dispatchEvent(showchange)
    }
  }

  _push (url) {
    this._handleHideEventListener()
    const route = this[getRoute](url)
    const view = createPage(route, {
      entry: this.entry.page,
      container: this.container,
      mid: this.mid,
      zIndex: this.stack.length
    })
    this.stack.push(view)
    return view
  }

  _pop () {
    const oldView = this.stack.pop()
    removePage(this.container, oldView)
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
