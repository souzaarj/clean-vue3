import { createWebHistory, createRouter } from 'vue-router'
import MakeLogin from '@/main/factories/pages/login-factory.vue'
import { Logo } from '@/presentation/components'
export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: MakeLogin,
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
