<template>
    <div class="container mx-auto space-y-4 bg-white py-4 pb-24">
        <div class="grid grid-cols-1 gap-4">
            <cart-product v-for="product in store.get_cart" :key="product.id" :product="product" />
        </div>
        <app-btn @click="handle_order" v-show="store.get_cart.length>0" class="w-full text-white">Заказать ({{store.get_total?.toLocaleString('en-EN')}}) сумов</app-btn>
        <div v-show="store.get_cart.length===0" class="flex justify-center items-center">
            <h1 class="text-gray-500">Нет продуктов</h1>
        </div>
        <Alert message="Покупка успешно создано!" v-if="alert"  />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Alert } from 'vue-tg'
import { useStore } from '@/store'
import { create_order } from '@/api/orders'
import AppBtn from '@/components/app-btn.vue'
import CartProduct from '@/components/cart-product.vue'

const alert = ref(false)
const store = useStore()

const handle_order = async () => {
    // TODO: add alert
    await create_order({
        status: 'pending',
        total: store.get_total,
        user_id: store.user?.id,
        body_order_items: store.get_cart.map(({id, quantity}) => ({product_id: id, quantity})),
    })
    alert.value = true
    store.cart = []
    localStorage.removeItem('app-cart')
    setTimeout(() => {
        alert.value = false
    }, 3000);
}
</script>
