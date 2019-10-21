let pid = 0

export function createPage (options) {
  const view = document.createElement('iframe')
  setAttr(view, options)
  setStyle(view)
  document.body.appendChild(view)
  insertPageJS(view)
  insertUserJS(view)
  return view
}

export function removePage (page) {
  document.body.removeChild(page)
}

function setAttr (view, attrs) {
  view.id = pid++
  for (const [key, val] of Object.entries(attrs)) {
    view.setAttribute(key, val)
  }
}

function setStyle (view) {
  const doc = document.documentElement
  view.style.width = doc.clientWidth + 'px'
  view.style.height = doc.clientHeight + 'px'
  view.style.position = 'fixed'
  view.style.border = 'none'
  view.style.zIndex = pid
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
