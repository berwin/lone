let pid = 0

export function createPage (options, entry) {
  const id = pid++
  const view = document.createElement('iframe')
  setAttr(id, view, options)
  setStyle(view)
  document.body.appendChild(view)
  insertJS(view, entry)
  return view
}

export function removePage (page) {
  document.body.removeChild(page)
}

function setAttr (id, view, attrs) {
  view.id = id
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
      </head>
      <body>${scriptTag}</body>
    </html>
  `)
}

function insertPageJS () {
  return '<script src="'+ __PAGEJS__ +'"></script>' // eslint-disable-line
}

function insertUserJS (entry) {
  return '<script src="' + entry.page + '"></script>'
}

function insertContainer () {
  return '<div id="app"></div>'
}
