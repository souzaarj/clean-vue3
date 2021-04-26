import { createWebHistory, createRouter } from 'vue-router'
import { Login } from '@/presentation/pages'
import { Logo } from '@/presentation/components'
export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Logo,
  },
  {
    path: '/',
    name: 'main',
    component: Logo,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
