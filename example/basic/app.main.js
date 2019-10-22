Lone.logic('test', {
  data: () => ({ n: 0 }),
  methods: {
    navigateAndIncrement () {
      const increment = () => this.n++
      if (this.$route.path === '/') {
        this.$router.push('/foo', increment)
      } else {
        this.$router.push('/', increment)
      }
    },
    navigatorTo () {
      this.navigateTo({
        url: '/é#%25ñ'
      })
    }
  },
  created () {
    console.log('app.main.js: created~~~')
  },
  onLoad (query) {
    console.log('app.main.js: onLoad~~~, query:', query)
  },
  mounted () {
    const vm = this
    setTimeout(() => {
      vm.setData({
        n: 2
      })
    }, 1000)
    this.navigateTo('/test')
    console.log('app.main.js: mounted~~~')
  },
  onReady () {
    console.log('app.main.js: onReady~~~')
  },
  onUnload () {
    console.log('app.main.js: onUnload~~~')
  },
  onShow () {
    console.log('app.main.js: onShow~~~')
  },
  onHide () {
    console.log('app.main.js: onHide~~~')
  }
})

Lone.logic('test2', {
  data: () => ({ n: 0 }),
  methods: {},
  created () {
    console.log('component test2: created~~~')
  },
  onLoad (query) {
    console.log('component test2: onLoad~~~, query:', query)
  },
  mounted () {
    this.navigateBack()
    console.log('component test2: mounted~~~')
  },
  onReady () {
    console.log('component test2: onReady~~~')
  },
  onUnload () {
    console.log('component test2: onUnload~~~')
  },
  onShow () {
    console.log('component test2: onShow~~~')
  },
  onHide () {
    console.log('component test2: onHide~~~')
  }
})
