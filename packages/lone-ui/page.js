let pid = 0

export function createPage (route, { container, entry }) {
  const id = pid++
  const view = document.createElement('iframe')
  setAttr(id, view, route)
  setStyle(view, container)
  container.appendChild(view)
  insertJS(view, entry)
  return view
}

export function removePage (container, page) {
  container.removeChild(page)
}

function setAttr (id, view, attrs) {
  view.id = id
  for (const [key, val] of Object.entries(attrs)) {
    view.setAttribute(key, val)
  }
}

function setStyle (view, container) {
  const box = container.tagName === 'BODY'
    ? document.documentElement
    : container
  view.style.width = box.clientWidth + 'px'
  view.style.height = box.clientHeight + 'px'
  view.style.position = 'fixed'
  view.style.border = 'none'
  view.style.zIndex = pid
  view.style.backgroundColor = 'white'
}

function insertJS (view, entry) {
  const scriptTag = [insertContainer, insertPageJS, insertUserJS].reduce((pre, gen) => pre + gen(entry), '')
  view.contentDocument.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>body{margin:0;}</style>
      </head>
      <body>${scriptTag}</body>
    </html>
  `)
}

function insertPageJS () {
  return '<script src="'+ __PAGEJS__ +'"></script>' // eslint-disable-line
}

function insertUserJS (entry) {
  return '<script src="' + entry + '"></script>'
}

function insertContainer () {
  return '<div id="app"></div>'
}
