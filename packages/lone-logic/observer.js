export function notifyPropsObserver (vm, oldData, newData) {
  const propsOptions = vm.$options.props
  for (const key in newData) {
    if (key in propsOptions) {
      const cur = newData[key]
      const old = oldData[key]
      const observer = propsOptions[key].observer
      if (JSON.stringify(cur) !== JSON.stringify(old)) {
        observer && observer.call(vm, cur, old)
      }
    }
  }
  for (const key in oldData) {
    if (!(key in newData)) {
      const old = oldData[key]
      const observer = propsOptions[key].observer
      observer && observer.call(vm, null, old)
    }
  }
}
