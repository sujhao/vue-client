import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import PictureCompressView from "../views/PictureCompressView.vue"
import PictureConvertView from "../views/PictureConvertView.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/picConvert"
  },
  {
    path: '/picConvert',
    component: PictureConvertView
  },
  {
    
    path: '/picCompress',
    component: PictureCompressView
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/chat',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ChatView.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
