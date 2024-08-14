<template>
    <div class="container mx-auto space-y-4 bg-white pb-24">
        <div v-show="store.get_cart.length===0" class="flex justify-center items-center">
            <h1 class="text-lg text-gray-500">Нет продуктов</h1>
        </div>
        <div class="grid grid-cols-1 gap-4">
            <cart-product v-for="product in store.get_cart" :key="product.id" :product="product" />
        </div>
        <app-btn v-show="store.get_cart.length>0" class="w-full text-white">Заказать ({{store.get_total}}) сумов</app-btn>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import AppBtn from '@/components/app-btn.vue'
import CartProduct from '@/components/cart-product.vue'

const store = useStore()
</script>
