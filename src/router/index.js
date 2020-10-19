import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blog',
    name: 'Blog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Blog.vue')
  },
  {
    path: '/blog/time',
    name: 'BlogTime',
    component: () => import(/* webpackChunkName: "about" */ '../views/BlogTime.vue')
  },
  {
    path: '/blog/timeline',
    name: 'BlogTimeline',
    component: () => import(/* webpackChunkName: "about" */ '../views/TimeLine.vue')
  },
  {
    path: '/blog/content',
    name: 'BlogContent',
    component: () => import(/* webpackChunkName: "about" */ '../views/BlogContent.vue')
  },
  {
    path: '/blog/manager',
    name: 'BlogManager',
    component: () => import(/* webpackChunkName: "about" */ '../views/BlogManager.vue')
  },
  {
    path: '/user',
    name: 'UserInfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserInfo.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/resume',
    name: 'Resume',
    component: () => import(/* webpackChunkName: "about" */ '../views/Resume.vue')
  },
  {
    path: '/project',
    name: 'Project',
    component: () => import(/* webpackChunkName: "about" */ '../views/Project.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
  }
]

const router = new VueRouter({
  base: '/',
  routes,
  mode: 'history'
})

export default router
