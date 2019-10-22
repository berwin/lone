Lone.page({
  components: [
    {
      name: 'test',
      template: `
        <div id="app">
          <h1>Basic</h1>
          <ul>
            <li><router-link to="/">/</router-link></li>
            <li><router-link to="/foo">/foo</router-link></li>
            <li><router-link to="/bar">/bar</router-link></li>
            <router-link tag="li" to="/bar" :event="['mousedown', 'touchstart']">
              <a>/bar</a>
            </router-link>
            <li><router-link to="/é">/é</router-link></li>
            <li><router-link to="/é?t=%25ñ">/é?t=%ñ</router-link></li>
            <li><router-link to="/é#%25ñ">/é#%25ñ</router-link></li>
            <li @click="navigatorTo">Navigator To /é#%25ñ</li>
          </ul>
          <button id="navigate-btn" @click="navigateAndIncrement">On Success</button>
          <pre id="counter">{{ n }}</pre>
          <pre id="query-t">{{ $route.query.t }}</pre>
          <pre id="hash">{{ $route.hash }}</pre>
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
