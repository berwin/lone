import './schedule'
import Router from './router'

export default function (options) {
  return new Router({
    routes: options.routes
  })
}
