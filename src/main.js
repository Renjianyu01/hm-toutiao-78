import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.less'
import router from './router/index.js'

import myPlugin from '@/components'
// 导入样式
import axios from '@/api'
Vue.use(myPlugin)

Vue.prototype.$http = axios

Vue.config.productionTip = false
// main.js职责
// 职责1：导入项目需要依赖的资源（js包，css，其他资源）
// 职责2：创建一个根实例
Vue.use(ElementUI)
// 根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
