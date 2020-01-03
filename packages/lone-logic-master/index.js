import { Slave } from 'lone-messenger'
import schedule from 'lone-logic/schedule'
import logicComponentRegister from 'lone-logic'

export default function logicMaster (UIConf) {
  const mid = UIConf.mid
  const pid = UIConf.pid
  const components = UIConf.components
  const slave = new Slave({ env: 'postMessage', channel: `${mid}_${pid}_logic` })
  registerComponent(components)
  schedule(slave)
}

function registerComponent (components) {
  for (let i = 0, len = components.length; i < len; i++) {
    const component = components[i]
    const name = component.name
    const official = component.official
    if (official) {
      logicComponentRegister(name, component)
    }
  }
}
