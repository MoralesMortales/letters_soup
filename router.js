import { createWebHistory, createRouter } from 'vue-router'

import Login from './src/components/Login.vue'
import Register from './src/components/Register.vue'
import Home from './src/components/MainWindow.vue'
import Historial from './src/components/Historial.vue'
import detail_soup from './src/components/show_History_element.vue'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/history', name: 'History', component: Historial },
  { path: '/detail:soup_id', name: 'detail_soup', component: detail_soup, props: true },
  { path: '/', name: 'Home', component: Home }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
