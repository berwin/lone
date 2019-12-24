Lone.ui({
  entry: {
    logic: './app.main.js',
    page: './app.page.js'
  },
  routes: [
    { path: '/', component: 'test' },
    { path: '/test', component: 'test2' },
    { path: '/official', component: 'official' }
  ]
})
