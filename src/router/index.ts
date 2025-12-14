import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/views/Home.vue') },
    { path: '/about', component: () => import('@/views/About.vue') },
    { path: '/demo-input', component: () => import('@/views/DemoAdvancedInput.vue') },
    { path: '/demo-menu', component: () => import('@/views/DemoMenu.vue') },
    { path: '/demo-modal', component: () => import('@/views/DemoModal.vue') },
    { path: '/demo-select', component: () => import('@/views/DemoSelect.vue') },
    { path: '/demo-multi-select', component: () => import('@/views/DemoMultiSelect.vue') },
    { path: '/demo-tabs', component: () => import('@/views/DemoTabs.vue') },
    { path: '/demo-button', component: () => import('@/views/DemoButton.vue') },
    { path: '/demo-radio-group', component: () => import('@/views/DemoRadioGroup.vue') },
  ],
})

export default router
