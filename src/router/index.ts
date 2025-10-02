import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/views/Home.vue') },
    { path: '/about', component: () => import('@/views/About.vue') },
    { path: '/demo-input', component: () => import('@/views/DemoAdvancedInput.vue') },
    { path: '/demo-menu', component: () => import('@/views/DemoMenu.vue') },
  ],
})

export default router
