import { createMemoryHistory, createRouter } from 'vue-router'

import Login from './components/Login.vue'
import Register from './Register.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router