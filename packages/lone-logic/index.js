import LogicComponent from './component'

const componentStorage = new Map()

export default function Component (name, options = {}) {
  componentStorage.set(name, options)
}

export function createComponentInstance (name, id, otherOptions) {
  const options = Object.assign(
    componentStorage.get(name),
    otherOptions
  )
  options.name = name
  return new LogicComponent(id, options)
}
