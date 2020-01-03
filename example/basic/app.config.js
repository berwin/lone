Lone.ui({
  entry: {
    logic: './app.main.js',
    page: './app.page.js'
  },
  routes: [
    { path: '/', component: 'test' },
    { path: '/official', component: 'official' },
    { path: '/lifecycle', component: 'lifecycle' },
    { path: '/query', component: 'query' }
  ]
})
