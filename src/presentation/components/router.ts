import { createWebHistory, createRouter } from 'vue-router'
import { Login } from '@/presentation/pages'

export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Login,
  },
  {
    path: '/',
    name: 'main',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
