import { Slave } from '../lone-messenger'
import schedule from '../lone-logic/schedule'

export const slave = new Slave({ env: 'worker', channel: 'logic-worker' })
schedule(slave)
slave.send('logic:inited')

export { default } from '../lone-logic'
