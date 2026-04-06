import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
    { path: '/', component: () => import('../pages/Landing.vue') },
    { path: '/login', component: () => import('../pages/Login.vue') },
    { path: '/register', component: () => import('../pages/Register.vue') },
    {
        path: '/dashboard',
        component: () => import('../pages/Dashboard.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/declaration/new',
        component: () => import('../pages/NewDeclaration.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/declarations/new',
        component: () => import('../pages/NewDeclaration.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/declaration/:id',
        component: () => import('../pages/EditDeclaration.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/declaration/:id/documents',
        component: () => import('../pages/UploadDocuments.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/declaration/:id/preview',
        component: () => import('../pages/PreviewDeclaration.vue'),
        meta: { requiresAuth: true }
    },
    { path: '/pricing', component: () => import('../pages/Pricing.vue') },
    { path: '/about', component: () => import('../pages/About.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router
