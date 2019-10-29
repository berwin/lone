Lone.page({
  components: [
    {
      name: 'test',
      template: `
        <div id="app">
          <h1>Basic</h1>
          <ul>
            <li>Navigator To /é#%25ñ</li>
          </ul>
          <button id="navigate-btn">On Success</button>
          <pre id="counter">{{ n }}</pre>
          <router-view class="view"></router-view>
        </div>
      `
    },
    {
      name: 'test2',
      template: '<div>test2</div>'
    }
  ]
})
