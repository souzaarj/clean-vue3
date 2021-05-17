import { createWebHistory, createRouter } from 'vue-router'
import MakeLogin from '@/main/factories/pages/login/login-factory.vue'
import MakeSignup from '@/main/factories/pages/signup/signup-factory.vue'

export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: MakeLogin,
  },
  {
    path: '/signup',
    name: 'signup',
    component: MakeSignup,
  },
  {
    path: '/',
    name: 'main',
    component: MakeSignup,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
