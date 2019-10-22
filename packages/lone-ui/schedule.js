import { Master } from 'lone-messenger'

const master = new Master({ env: 'postMessage' })

class Schedule {
  constructor ({ router }) {
    const vm = this
    vm.router = router
    vm.logicEvents = {
      'logic:data': function (channel, { id, data }) {
        master.send('ui:data', channel, { id, data })
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
        console.log(name, id)
        master.send('ui:inited', channel, { name, id })
      },
      'page:ready': function (channel, { id }) {
        master.send('ui:ready', channel, { id })
      }
    }
    vm.init()
  }

  init () {
    this.listenEvents(master, this.logicEvents)
    this.listenEvents(master, this.pageEvents)
  }

  listenEvents (messenger, events) {
    for (const [event, fn] of Object.entries(events)) {
      messenger.onmessage(event, fn)
    }
  }
}

export default Schedule
