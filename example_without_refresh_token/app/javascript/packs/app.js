import BabelPolyfill from 'babel-polyfill' // use reference to prevent tree shaking
import Vue from 'vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

import store from '../app/store'
import router from '../app/router'
import App from '../app/App.vue'

Vue.use(Mint)

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(document.createElement('app'))
  new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('app')
})
