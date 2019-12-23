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
    navigatorTo (url) {
      // this.navigateTo({
      //   url: '/é#%25ñ'
      // })
      this.navigateTo(url)
    },
    test (data) {
      console.log('event trigger!', data)
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
        n: 2,
        list: [...vm.data.list, 6]
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
  props: {
    title: String,
    n: {
      type: Number,
      required: true,
      default: -1,
      validator: function (value) {
        return value >= 0
      }
    },
    list: {
      type: Array,
      observer (newData, oldData) {
        console.log('ad->props-observer:', newData, oldData)
      }
    }
  },
  created () {
    this.$emit('enlarge-text', 123)
  }
})

Lone.logic('v-model', {
  data: () => (
    { n: 0, message: '', checked: false, checkedNames: [], picked: '', selected: [] }
  ),
  methods: {
    showModel () {
      console.log(this.data)
    }
  }
})

Lone.logic('alert')
Lone.logic('base-layout')
Lone.logic('handle-error', {
  data () {
    console.log(window)
  },
  handleError () {
    console.log(window)
  }
})
