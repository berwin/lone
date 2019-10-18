const pageStack = []
let pid = 0

export function createPage () {
  const view = document.createElement('iframe')
  view.id = pid++
  setStyle(view)
  document.body.appendChild(view)
  insertPageJS(view)
  insertUserJS(view)
  pageStack.push(view)
  return view
}

export function currentPage () {
  return pageStack[pageStack.length - 1] || null
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
  insertJS(view, __PAGEJS__) // eslint-disable-line
}

function insertUserJS (view) {
  insertJS(view, './app.page.js')
}

function insertJS (view, url) {
  const script = document.createElement('script')
  script.src = url
  view.contentDocument.body.appendChild(script)
}
