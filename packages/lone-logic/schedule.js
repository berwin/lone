import { Master } from 'lone-messenger'

const componentStorage = new Map()

const master = new Master({
  env: 'postMessage'
})

master.onmessage('customType', function (data) {
  console.log('logic:', data)
})

master.send('customType', { name: 'Berwin' })

export function addComponent (id, component) {
  componentStorage.set(id, component)
}
