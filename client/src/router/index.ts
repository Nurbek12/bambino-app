import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/welcome', component: () => import('../pages/app/welcome.vue') },
        { path: '/', component: () => import('../pages/app/index.vue'), children: [
            { path: '', component: () => import('../pages/app/products.vue') },
            { path: '/product/:id', component: () => import('../pages/app/product.vue') },
            { path: '/saved', component: () => import('../pages/app/saved.vue') },
            { path: '/orders', component: () => import('../pages/app/orders.vue') },
            { path: '/cart', component: () => import('../pages/app/cart.vue') },
            { path: '/profile', component: () => import('../pages/app/profile.vue') },
        ] }
    ],
})