<template>
    <div class="container mx-auto space-y-4 bg-white pt-4 pb-24">
        <chip-group @update:model-value="init" v-model="status" :list="Object.keys(order_statuses).map(k => ({id:k, name:order_statuses[k as keyof typeof order_statuses]}))" />
        <div v-show="items.length === 0" class="flex justify-center items-center">
            <h1 class="text-gray-500">Нет покупки</h1>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <order v-for="order,i in items" :key="i" :order="order" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/store'
import { IOrder } from '@/constants/types'
import Order from '@/components/order.vue'
import { order_statuses } from '@/constants'
import { get_my_orders } from '@/api/orders'
import ChipGroup from '@/components/chip-group.vue'

const status = ref('')
const store = useStore()
const loading = ref(false)
const items = ref<IOrder[]>([])

const init = async () => {
    try {
        loading.value = true
        const { data } = await get_my_orders(store.user!.id, { status: status.value })
        items.value = data.data
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

init()
</script>
