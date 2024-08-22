<template>
    <div class="container mx-auto space-y-4 bg-white pt-4 pb-24">
        <chip-group @update:model-value="load_orders" v-model="status" :list="Object.keys(order_statuses).map(k => ({id:k, name:order_statuses[k as keyof typeof order_statuses]}))" />
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <order v-for="order,i in items" :key="i" :order="order" @handle-report="report.order_id=order.id" />
        </div>
        <div class="flex items-center flex-col gap-2 w-full">
            <h1 class="text-gray-500" v-show="items.length===0">Нет покупки</h1>
            <h1 class="text-gray-500 animate-pulse" v-show="loading">Загрузка продуктов...</h1>
            <app-btn @click="load_orders" class="text-white px-4" v-show="items.length>count">Загружать еще</app-btn>
        </div>
    </div>
    <app-dialog :model-value="!!report.order_id" @close-dialog="report.order_id=null" title="Добавите репорт">
        <form @submit.prevent="hanle_create_report" class="w-full space-y-4">
            <app-textarea required v-model="report.text" class="w-full" placeholder="Опишите проблему о покупки" />
            <app-btn class="w-full text-white">Отправить</app-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { ref, reactive } from 'vue'
import { IOrder } from '@/constants/types'
import Order from '@/components/order.vue'
import { order_statuses } from '@/constants'
import { get_my_orders } from '@/api/orders'
import { create_report } from '@/api/reports'
import AppBtn from '@/components/app-btn.vue'
import AppDialog from '@/components/app-dialog.vue'
import ChipGroup from '@/components/chip-group.vue'
import AppTextarea from '@/components/app-textarea.vue'

const page = ref(1)
const count = ref(0)
const status = ref('')
const store = useStore()
const loading = ref(false)
const items = ref<IOrder[]>([])
const report = reactive({
    text: '',
    status: "pending",
    user_id: store.user!.id,
    order_id: null as number | null,
})

const load_orders = async (status: string) => {
    try {
        loading.value = true
        const { data } = await get_my_orders(store.user!.id, { status, page: page.value, limit: 20 })
        if(page.value == 1) {
            items.value = data.data
            count.value = data.count
        } else {
            items.value.concat(data.data)
        }
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

const hanle_create_report = async () => {
    try {
        const ind = items.value.findIndex(o => o.id === report.order_id)
        items.value[ind].is_reported = true
        await create_report(report as any)
        alert('Репорт успешно отправлено!')
    } catch (error) {
        console.log(error)
    } finally {
        report.text = ""
        report.order_id = null
    }
}

load_orders(status.value)
</script>
