Lone.page({
  components: [
    {
      name: 'test',
      template: `
        <div id="app">
          <h1>Page 1</h1>
          <ul>
            <li><button v-on:click="navigatorTo('/official')">navigateTo: /official</button></li>
            <li><button v-on:click="navigatorTo('/lifecycle')">navigateTo: /lifecycle</button></li>
            <li><button v-on:click="navigatorTo('/query?a=1&b=2')">navigateTo: /query?a=1&b=2</button></li>
            <li><button v-on:click="navigatorTo('/不存在的URL')">navigateTo: 不存在的URL</button></li>
          </ul>
          <ul>
            <li v-for="item in list">{{item}}</li>
          </ul>
          <h2 :id="n" :style="{backgroundColor: 'red'}" style="color:blue;">N:{{ n }}</h2>
          <ad title="My journey with Lone" :n="n" @enlarge-text="test" :list="list" />
          <alert>I'm a Slot content.</alert>
          <alert></alert>
          <base-layout>
            <p slot="header">Slot Header</p>
            <p>
              <base-layout>
                <p slot="header">Nest slot Header</p>
                <p>Nest slot main content.{{list}}</p>
                <p slot="footer">Nest slot2 Footer</p>
              </base-layout>
            </p>
            <p slot="footer">Slot Footer</p>
          </base-layout>
          <v-model />
          <handle-error />
        </div>
      `
    },
    {
      name: 'ad',
      template: '<div>我是广告{{n}} {{title}}, {{list}}</div>'
    },
    {
      name: 'alert',
      template: '<div style="padding:10px 0;"><slot>I\'m a Slot default content.</slot></div>'
    },
    {
      name: 'base-layout',
      template: `
        <div style="padding:10px 0;background:#ccc;">
          <div class="container">
            <header>
              <slot name="header"></slot>
            </header>
            <main>
              <slot name="default"></slot>
            </main>
            <footer>
              <slot name="footer"></slot>
            </footer>
          </div>
        </div>
      `
    },
    {
      name: 'v-model',
      template: `<div style="background-color: aquamarine;">
        <input v-model="n">
        <p>you input is: {{n}}</p>
        <p @click="showModel" style="cursor: pointer;">click me show the input model on console.</p>
        <h3>textarea:</h3>
        <textarea v-model="message" placeholder="add multiple lines"></textarea>
        <br />
        <span>Multiline message is:{{ message }}</span>

        <h3>单个复选框，绑定到布尔值:</h3>
        <div>
          <input type="checkbox" id="checkbox" v-model="checked">
          <label for="checkbox">{{ checked }}</label>
        </div>
        <h3>多个复选框，绑定到同一个数组：        </h3>
        <div id='example-3'>
          <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
          <label for="jack">Jack</label>
          <input type="checkbox" id="john" value="John" v-model="checkedNames">
          <label for="john">John</label>
          <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
          <label for="mike">Mike</label>
          <br>
          <span>Checked names: {{ checkedNames }}</span>
        </div>
        <h3>单选按钮</h3>
        <div id="example-4">
          <input type="radio" id="one" value="One" v-model="picked">
          <label for="one">One</label>
          <br>
          <input type="radio" id="two" value="Two" v-model="picked">
          <label for="two">Two</label>
          <br>
          <span>Picked: {{ picked }}</span>
        </div>
      </div>
      `
    },
    {
      official: true,
      name: 'official',
      template: `
        <div style="padding:10px 0;">
          <button v-on:click="back">navigatorBack</button>
          <p>我是官方组件，我可以直接用JS访问DOM与BOM: {{n}}</p>
          <p>因为我的JS在页面内的UI主线程中运行</p>
        </div>
      `,
      data () {
        return {
          n: 0
        }
      },
      onReady () {
        setTimeout(() => {
          this.setData({ n: 1 })
        }, 1000)
        console.log(document, window)
      },
      back () {
        this.navigateBack()
      }
    },
    {
      name: 'handle-error',
      template: `
      <section style="color: red;background-color: #fff;border: 2px solid #666;">
        <header><h4 @click="handleError">Handle Error Section</h4></header>
        <main></main>
      </section>
      `
    },
    {
      name: 'lifecycle',
      template: `
        <div>
          <h1>lifecycle </h1>
          <div><button @click="back">back</button></div>
          <div><button @click="addItem">使items变化，触发beforeUpdate, updated</button></div>
          <div><button @click="dontChange">不使数据变化，但触发setData</button></div>
          <div class="lifecycle_result">
            <div v-for="item in items">{{item}}</div>
          </div>
          <destory />
        </div>
      `
    },
    {
      name: 'destory',
      template: `
      <div style="padding:10px 0;background:#ccc;">
        <button @click="handleDestroyed">销毁组件</button>
        <p>销毁组件Demo</p>
      </div>
      `
    },
    {
      name: 'query',
      template: `
        <div>
          <div><button @click="back">navigateBack</button></div>
          <div><button v-on:click="navigatorTo('/query?a=1&b=3')">navigateTo: /query?a=1&b=2</button></div>
          <h2>Query:{{query}}</h2>
        </div>
      `
    }
  ]
})
