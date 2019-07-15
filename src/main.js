// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.
// import { Button, Cell } from 'mint-ui'

import App from './App'
//
// Vue.component('MtButton', Button)
// Vue.component('MtCell', Cell)

import router from './router/index.js'
import store from './store/index'

import './cube-ui'
import './mint-ui'

import '@/common/stylus/index.styl'

import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn');


import http from '@/utils/request'

Vue.prototype.$http = http

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
