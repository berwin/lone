import { Slave } from 'lone-messenger'
import schedule from 'lone-logic/schedule'

export const slave = new Slave({ env: 'worker', channel: 'worker-logic' })
schedule(slave)

export { default } from 'lone-logic'
