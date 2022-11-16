import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/AuthView.vue')
  },
  {
    path: '/cabinet',
    name: 'cabinet',
    component: () => import(/* webpackChunkName: "auth" */ '../views/CabinetView.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import(/* webpackChunkName: "test" */ '../views/TestView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
