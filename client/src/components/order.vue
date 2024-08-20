<template>
    <div class="w-full h-min transition-all bg-gray-100 p-2 rounded-2xl">
        <div class="space-y-1 px-2 text-sm">
            <h2>Заказ: #{{ (order?.id || 1).toString().padStart(6, '0') }}</h2>
            <h2>Создано: {{ new Date(order?.created_at||0).toLocaleString() }}</h2>
            <h2>
                Статус:
                <span :class="order_status_items[order?.status||'pending'][1]">
                    {{ order_status_items[order?.status||'pending'][0]  }}
                </span>
            </h2>
            <h2>Сумма заказа: {{ order?.total || 0 }} сумов</h2>
        </div>
        <div v-if="open" class="bg-gray-300 my-2 py-2 px-4 rounded-xl">
            <h2 class="text-sm">Продукты заказа: {{ items?.length || 0 }}</h2>
            <div class="space-y-2 py-2" v-show="items?.length!>0">
                <div class="px-4 py-2 w-full flex items-center gap-2 rounded-lg bg-primary-500 text-sm text-white" v-for="p,i in items" :key="i">
                    <span>{{ i+1 }}.</span>
                    <span>{{ p.product.name }}</span>
                    <span>{{ p.quantity }}x</span>
                    <span>{{ p.product.price }}</span>
                </div>
            </div>
        </div>
        <app-btn @click="toggleOrder" :disabled="loading" class="mt-2 w-full text-white">
            {{ loading ? "" : open ? 'Скрыть детали заказа':'Посмотреть детали заказа' }}
            {{ loading ? "Загрузка" : "" }}
        </app-btn>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { get_order } from '@/api/orders'
import AppBtn from '@/components/app-btn.vue'
import { order_status_items } from '@/constants'
import { IOrder, IOrderItem } from '@/constants/types'

const props = defineProps<{ order?: IOrder }>()
const open = ref(false)
const loading = ref(false)
const items = ref<IOrderItem[]|null>(null)

const toggleOrder = async () => {
    if(items.value === null){
        const { data } = await get_order(props.order?.id||0)
        items.value = data?.data?.order_items || [] 
    }
    open.value = !open.value
}
</script>