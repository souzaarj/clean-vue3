import { createWebHistory, createRouter } from 'vue-router'
import MakeLogin from '@/main/factories/pages/login-factory.vue'
import { Logo } from '@/presentation/components'
import { Signup } from '@/presentation/pages'

export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: MakeLogin,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/',
    name: 'main',
    component: Signup,
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
