// 职责：初始化路由对象，提供main.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/'
    // redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }]
})

export default router
