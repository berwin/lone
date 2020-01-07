import { Master } from 'lone-messenger'

class Schedule {
  constructor ({ router, entry, mid }) {
    const vm = this
    vm.router = router
    vm.entry = entry
    this.master = new Master({
      mid: mid,
      env: 'worker',
      worker: new Worker(vm.entry.logic)
    })
    vm.logicEvents = {
      'logic:inited': function () {
        // Default Route Page
        vm.router.navigateTo(vm.router.routes[0].path)
      },
      'logic:navigateTo': function (channel, { url }) {
        return vm.router.navigateTo(url)
      },
      'logic:redirectTo': function (channel, { url }) {
        return vm.router.redirectTo(url)
      },
      'logic:navigateBack': function (channel, { delta }) {
        return vm.router.navigateBack(delta)
      }
    }
    vm.pageEvents = {
      'page:navigateTo': function () {
        console.log('ui-schedule: view:navigateTo')
      }
    }
    vm.init()
    vm.listenVisibilityChange(vm.router)
  }

  init () {
    this.listenEvents(this.master, this.logicEvents)
    this.listenEvents(this.master, this.pageEvents)
  }

  listenEvents (messenger, events) {
    for (const [event, fn] of Object.entries(events)) {
      messenger.onmessage(event, fn)
    }
  }

  listenVisibilityChange (router) {
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        router.triggerCurrentPageShowHook()
      } else {
        router.triggerCurrentPageHideHook()
      }
    })
  }
}

export default Schedule
