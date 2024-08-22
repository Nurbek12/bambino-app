import { useWebApp } from 'vue-tg'
import { useStore } from '@/store'
import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: () => import('../pages/app/index.vue'), children: [
            { path: '', component: () => import('../pages/app/products.vue') },
            { path: '/product/:id', component: () => import('../pages/app/product.vue') },
            { path: '/saved', component: () => import('../pages/app/saved.vue') },
            { path: '/orders', component: () => import('../pages/app/orders.vue') },
            { path: '/cart', component: () => import('../pages/app/cart.vue') },
            { path: '/delivery', component: () => import('../pages/app/delivery.vue') },
        ], beforeEnter(_, __, next){
            const webApp = useWebApp()
            if(webApp.initData === '') return next('/login')
            return next()
        } },
        { path: '/admin', component: () => import('../pages/admin/index.vue'), children: [
            { path: '', component: () => import('../pages/admin/statistics.vue') },
            { path: 'products', component: () => import('../pages/admin/products.vue') },
            { path: 'categories', component: () => import('../pages/admin/categories.vue') },
            { path: 'orders', component: () => import('../pages/admin/orders.vue') },
            { path: 'reviews', component: () => import('../pages/admin/reviews.vue') },
            { path: 'users', component: () => import('../pages/admin/users.vue') },
            { path: 'reports', component: () => import('../pages/admin/reports.vue') },
        ], beforeEnter(_, __, next){
            const store = useStore()
            if(!store.is_authencated) return next('/login')
            return next()
        }},
        { path: '/login', component: () => import('../pages/admin/login.vue') },
    ],
})