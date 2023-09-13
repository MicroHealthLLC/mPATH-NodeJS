import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Register from '../views/RegisterView.vue'
import AdminPanelIndex from '../views/AdminPanelIndex.vue'    
import UserProfileIndex from '../views/UserProfileIndex.vue'
import HelpIndex from '../views/HelpIndex.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/register',
      name: 'about',
      component: Register 
    },
    {
      path: '/admin_panel',
      name: 'adminPanel',
      component: AdminPanelIndex
    },
    {
      path: '/profile',
      name: 'userProfile',
      component: UserProfileIndex
    },
    {
      path: '/help',
      name: 'help',
      component: HelpIndex
    }
  ]
})

export default router
