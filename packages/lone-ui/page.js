const pageStack = []

export function createPage () {
  const view = document.createElement('iframe')
  setStyle(view)
  document.body.appendChild(view)
  insertPageJS(view)
  return view
}

function setStyle (view) {
  const doc = document.documentElement
  view.style.width = doc.clientWidth + 'px'
  view.style.height = doc.clientHeight + 'px'
  view.style.position = 'fixed'
  view.style.border = 'none'
  view.style.zIndex = pageStack.length
  view.style.backgroundColor = 'white'
}

function insertPageJS (view) {
  const script = document.createElement('script')
  script.src = __PAGEJS__ // eslint-disable-line
  view.contentDocument.body.appendChild(script)
}
