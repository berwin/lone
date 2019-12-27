Lone.page({
  components: [
    {
      name: 'test',
      template: `
        <div id="app">
          <h3>Page 1</h3>
          <ul>
            <li v-for="item in list">{{item}}</li>
          </ul>
          <ul>
            <li><button v-on:click="to('/test2')">navigatorTo: /test2</button></li>
          </ul>
        </div>
      `
    },
    {
      name: 'test2',
      template: `
      <div style="padding:10px 0;">
        <button v-on:click="back">navigatorBack</button>
        <p>我是第二个页面: {{n}}</p>
      </div>
      `
    }
  ]
})
