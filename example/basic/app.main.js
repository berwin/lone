importScripts('../../dist/lone.logic.js')

Lone.logic('test', {
  data: () => ({ n: 0, list: [1, 2, 3, 4, 5] }),
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
      this.navigateTo({
        url
      })
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
    { n: 0, message: 'default text', checked: true, checkedNames: ['Jack'], picked: 'One' }
  ),
  methods: {
    showModel () {
      console.log(this.data)
    }
  },
  mounted () {
    setTimeout(_ => {
      this.setData({
        n: 2
      })
    }, 1000)
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

Lone.logic('lifecycle', {
  beforeCreate () {
    console.log('lifecycle: beforeCreate')
  },
  created () {
    console.log('lifecycle: created')
  },
  onReady () {
    console.log('lifecycle: onReady')
  },
  mounted () {
    console.log('lifecycle: mounted')
  },
  onLoad  () {
    console.log('lifecycle: onLoad')
  },
  onShow () {
    console.log('lifecycle: onShow')
  },
  onHide () {
    console.log('lifecycle: onHide')
  },
  beforeMount () {
    console.log('lifecycle: beforeMount')
  },
  beforeUpdate () {
    console.log('lifecycle: beforeUpdate')
  },
  updated () {
    console.log('lifecycle: updated')
  },
  beforeDestroy  () {
    console.log('lifecycle: beforeDestroy')
  },
  onUnload () {
    console.log('lifecycle: onUnload ')
  },
  destroyed () {
    console.log('lifecycle: destroyed ')
  },
  data: () => ({ items: [], a: 0 }),
  methods: {
    addItem () {
      this.data.items.push(this.data.a)
      this.setData({
        items: this.data.items,
        a: this.data.a + 1
      })
    },
    dontChange () {
      this.setData({
        items: this.data.items,
        a: this.data.a
      })
    },
    back () {
      this.navigateBack()
    }
  }
})

Lone.logic('destory', {
  handleDestroyed () {
    this.$destroy()
  },
  beforeDestroy  () {
    console.log('lifecycle: beforeDestroy')
  },
  destroyed () {
    console.log('lifecycle: destroyed ')
  }
})

Lone.logic('query', {
  data () {
    return {
      query: ''
    }
  },
  created () {
    this.setData({
      query: '11'
    })
  },
  onLoad (query) {
    this.setData({
      query: query ? JSON.stringify(query) : ''
    })
  },
  back () {
    this.navigateBack()
  },
  navigatorTo (url) {
    this.navigateTo({
      url
    })
  }
})
