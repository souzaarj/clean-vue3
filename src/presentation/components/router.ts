import { createWebHistory, createRouter } from 'vue-router'
import { Login } from '@/presentation/pages'

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
