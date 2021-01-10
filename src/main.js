import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Storage from 'vue-ls';
import request from './utils/httpRequest'
import api from './utils/api'
import utils from './utils/util'
import './utils/rem'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css'

let options = {
  namespace: '', // key键前缀
  name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
  storage: 'local', // 存储名称: session, local, memory
};

// 定义全局变量
Vue.prototype.$axios = request
Vue.prototype.$api = api
Vue.prototype.$utils = utils
Vue.use(Storage, options)
Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')