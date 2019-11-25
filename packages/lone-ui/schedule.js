import { Master } from 'lone-messenger'

class Schedule {
  constructor ({ router, entry }) {
    const vm = this
    vm.router = router
    vm.entry = entry
    this.master = new Master({
      env: 'worker',
      worker: new Worker(vm.entry.logic)
    })
    vm.logicEvents = {
      'logic:inited': function () {
        // Default Route Page
        vm.router.navigateTo(vm.router.routes[0].path)
      },
      'component:inited': function (channel, data) {
        vm.master.send('component:inited', channel, data)
      },
      'component:data': function (channel, data) {
        vm.master.send('component:data', channel, data)
      },
      'logic:navigateTo': function (channel, { url }) {
        vm.router.navigateTo(url)
      },
      'logic:redirectTo': function (channel, { url }) {
        vm.router.redirectTo(url)
      },
      'logic:navigateBack': function (channel, { delta }) {
        vm.router.navigateBack(delta)
      }
    }
    vm.pageEvents = {
      'page:navigateTo': function () {
        console.log('ui-schedule: view:navigateTo')
      },
      'page:inited': function (channel, { name, id }) {
        vm.master.send('ui:inited', channel, { name, id })
      },
      'page:ready': function (channel, { id }) {
        vm.master.send('ui:ready', channel, { id })
      },
      'page:triggerEvent': function (channel, data) {
        vm.master.send('ui:triggerEvent', channel, data)
      }
    }
    vm.init()
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
}

export default Schedule
