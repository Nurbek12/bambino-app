<template>
    <div class="w-full bg-gray-100 py-2 px-4 rounded-xl">
        <h2>Заказ: #123445</h2>
        <h2>Создано: 10.10.2010 21:21</h2>
        <h2>Статус: <span class="text-green-600">В ожидание</span></h2>
        <h2>Сумма заказа: 10.40 сумов</h2>
        <h2>Продукты заказа: 3</h2>
        <app-btn class="mt-2 w-full text-white">Посмотреть детали заказа</app-btn>
    </div>
</template>

<script setup lang="ts">
import { IOrder } from '@/constants/types'
import AppBtn from '@/components/app-btn.vue'

defineProps<{
    order?: IOrder
}>()
</script>