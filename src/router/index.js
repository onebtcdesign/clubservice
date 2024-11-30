import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Info from '../views/Info.vue'
import Airdrop from '../views/Airdrop.vue'
import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: Login,
      meta: { layout: 'auth' }
    },
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'info',
          name: 'info',
          component: Info
        },
        {
          path: 'airdrop',
          name: 'airdrop',
          component: Airdrop
        }
      ]
    }
  ]
})

export default router 