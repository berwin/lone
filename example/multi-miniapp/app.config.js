Lone.ui({
  container: '#cube-one',
  entry: {
    logic: './app.main.js',
    page: './app.page.js'
  },
  routes: [
    { path: '/', component: 'test' },
    { path: '/test2', component: 'test2' }
  ]
})

Lone.ui({
  container: '#cube-two',
  entry: {
    logic: './app.main.js',
    page: './app.page.js'
  },
  routes: [
    { path: '/', component: 'test' },
    { path: '/test2', component: 'test2' }
  ]
})
