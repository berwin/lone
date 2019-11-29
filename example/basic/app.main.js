importScripts('../../dist/lone.logic.js')

Lone.logic('test', {
  data: () => ({ n: 0, list: [1,2,3,4,5] }),
  methods: {
    navigateAndIncrement () {
      const increment = () => this.n++
      if (this.$route.path === '/') {
        this.$router.push('/foo', increment)
      } else {
        this.$router.push('/', increment)
      }
    },
    navigatorTo (event) {
      // this.navigateTo({
      //   url: '/é#%25ñ'
      // })
      console.log(event)
      this.navigateTo('/test')
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
  back () {
    this.navigateBack()
  }
})

Lone.logic('ad', {
  data: () => ({ n: 0 }),
  mounted () {
    setTimeout(_ => {
      this.setData({
        n: 1
      })
    }, 1000)
  }
})
