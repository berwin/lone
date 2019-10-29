Lone.page({
  components: [
    {
      name: 'test',
      template: `
        <div id="app">
          <h1>Page 1</h1>
          <ul>
            <li>Navigator To /é#%25ñ</li>
          </ul>
          <button id="navigate-btn">On Success</button>
          <h2>N:{{ n }}</h2>
          <router-view class="view"></router-view>
        </div>
      `
    },
    {
      name: 'test2',
      template: '<h1>Page 2</h1>'
    }
  ]
})
