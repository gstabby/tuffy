import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Router from 'vue-router'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './common/css/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from 'axios'
import qs from 'qs'

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.qs = qs

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // window.localStorage.getItem("accessToken") 获取token的value
  const token = window.localStorage.getItem('token')
  if (token) {
  // 将token放到请求头发送给服务器,将tokenkey放在请求头中
    config.headers.Authorization = token
    // 也可以这种写法
    // config.headers['accessToken'] = Token
    return config
  } else {
    return config
  }
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
