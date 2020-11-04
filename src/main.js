// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import lottie from 'lottie-web'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.$lottie = lottie
Vue.prototype.$qs = qs

//安装插件
Vue.use(VueAxios, axios)
Vue.use(ElementUI)

axios.defaults.baseURL = 'http://service.dabao.com';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


