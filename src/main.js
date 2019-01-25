import Vue from 'vue'
import App from './App'
import router from './router'
import http from '@/utils/http'
import filters from '@/filters/index.js'
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import './assets/scss/app.scss'

import './assets/scss/weiui.scss'
Vue.use(MintUI);

import SDK from './sdk/NIM_Web_SDK_v5.0.0'
import $ from 'jquery'

Vue.prototype.$http = http

Object.keys(filters).forEach(k => Vue.filter(k,filters[k]));
Vue.prototype.$IM = SDK;
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


