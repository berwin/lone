let pid = 0

export function createPage (options) {
  const id = pid++
  const view = document.createElement('iframe')
  setAttr(id, view, options)
  setStyle(view)
  document.body.appendChild(view)
  insertJS(view)
  return view
}

export function removePage (page) {
  document.body.removeChild(page)
}

function setAttr (id, view, options) {
  view.id = id
  const attrs = Object.assign(options, { name: id })
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

function insertJS (view) {
  const scriptTag = [insertPageJS, insertUserJS].reduce((pre, gen) => pre + gen(), '')
  view.contentDocument.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title></head><body>'+ scriptTag +'</body></html>') // eslint-disable-line
}

function insertPageJS () {
  return '<script src="'+ __PAGEJS__ +'"></script>' // eslint-disable-line
}

function insertUserJS () {
  return '<script src="./app.page.js"></script>'
}
