import 'babel-polyfill'
import Vue from 'vue'
import Cube from 'cube-ui'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios'
import store from './store'
import VueLazyLoad from 'vue-lazyload'
import 'common/stylus/index.styl'


import fastclick from 'fastclick'
import utils from 'common/js/utils.js'

Vue.use(VueResource)
Vue.use(Cube)
Vue.use(VueLazyLoad,{
  // loading:require("common/image/default.png")
  error: 'data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=',      　　// 图片路径错误时加载图片
  loading: 'data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs='    //预加载图片
})
Vue.prototype.axios = axios
Vue.prototype._utils = utils

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
