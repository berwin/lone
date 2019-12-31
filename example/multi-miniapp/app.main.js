importScripts('../../dist/lone.logic.js')

Lone.logic('test', {
  data: () => ({ list: [1, 2] }),
  methods: {
    to (url) {
      this.navigateTo(url)
    }
  },
  mounted () {
    const vm = this
    setTimeout(() => {
      vm.setData({
        list: [...vm.data.list, 3]
      })
    }, 1000)
  }
})

Lone.logic('test2', {
  data () {
    return {
      n: 0
    }
  },
  onReady () {
    setTimeout(() => {
      this.setData({ n: 1 })
    }, 1000)
  },
  back () {
    this.navigateBack()
  }
})
