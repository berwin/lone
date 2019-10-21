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
    this.navigateTo({
      url: this.routes[0].path
    })

    setTimeout(_ => {
      this.redirectTo({
        url: this.routes[1].path
      })
    }, 2000)
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

  navigateTo ({ url, success, fail, complete }) {
    try {
      const route = this[getRoute](url)
      const view = createPage(route)
      this.stack.push(view)
      success && success(view)
    } catch (e) {
      console.log(e)
      fail && fail(e)
    }
    complete && complete()
  }

  redirectTo ({ url, success, fail, complete }) {
    try {
      const oldView = this.stack.pop()
      const route = this[getRoute](url)
      removePage(oldView)
      const view = createPage(route)
      this.stack.push(view)
      success && success(view)
    } catch (e) {
      console.log(e)
      fail && fail(e)
    }
    complete && complete()
  }

  navigateBack () {}
}

export default Router
