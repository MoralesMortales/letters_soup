import { createWebHistory, createRouter } from 'vue-router'

import Login from './src/components/Login.vue'
import Register from './src/components/Register.vue'
import Home from './src/components/MainWindow.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/', name: 'Home', component: Home }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
