// 职责：初始化路由对象，提供main.js使用
import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import Notfound from '@/views/404'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/',
    component: Home,
    children: [{
      path: '/',
      name: 'welcome',
      component: Welcome
    }, {
      path: '/article',
      name: 'article',
      component: Article
    }]
  }, {
    path: '*',
    name: '404',
    component: Notfound
  }]
})

export default router
