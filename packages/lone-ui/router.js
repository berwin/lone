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

  triggerCurrentPageHideHook () {
    const currentPage = this.currentPage()
    if (currentPage) {
      var hidechange = new Event('onHide')
      currentPage.contentDocument.dispatchEvent(hidechange)
    }
  }

  triggerCurrentPageShowHook () {
    const currentPage = this.currentPage()
    if (currentPage) {
      var showchange = new Event('onShow')
      currentPage.contentDocument.dispatchEvent(showchange)
    }
  }

  _push (url) {
    const route = this[getRoute](url)
    if (!route) throw new Error(`跳转到不存在的路由地址：${url}`)
    this.triggerCurrentPageHideHook() // 路由切换之前 执行当前iframe的onHide
    const { component } = route
    const { pathname, search } = parse(url)
    const view = createPage({
      component,
      pathname,
      search
    }, {
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
    this.triggerCurrentPageShowHook()
  }

  navigateTo (url) {
    return new Promise((resolve, reject) => {
      try {
        this._push(url)
        resolve()
      } catch (err) {
        reject(err)
        console.error(err)
      }
    })
  }

  redirectTo (url) {
    return new Promise((resolve, reject) => {
      try {
        this._pop()
        this._push(url)
        resolve()
      } catch (err) {
        reject(err)
        console.error(err)
      }
    })
  }

  // 如果 delta 大于现有页面数，则返回到首页。
  navigateBack (delta = 1) {
    return new Promise((resolve, reject) => {
      try {
        const len = this.stack.length
        if (delta >= len) delta = (len - 1)
        while (delta--) {
          this._pop()
        }
        resolve()
      } catch (err) {
        reject(err)
        console.error(err)
      }
    })
  }
}

export default Router
