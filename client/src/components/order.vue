<template>
    <div class="w-full transition-all bg-gray-100 p-2 rounded-2xl">
        <div class="space-y-1 px-2">
            <h2>Заказ: #123445</h2>
            <h2>Создано: 10.10.2010 21:21</h2>
            <h2>Статус: <span class="text-green-600">В ожидание</span></h2>
            <h2>Сумма заказа: 10.40 сумов</h2>
            <h2>Продукты заказа: 3</h2>
        </div>
        <div v-if="open" class="bg-gray-300 my-2 h-[200px] p-4 rounded-xl">

        </div>
        <app-btn @click="open=!open" class="mt-2 w-full text-white">{{open?'Скрыть':'Посмотреть'}} детали заказа</app-btn>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IOrder } from '@/constants/types'
import AppBtn from '@/components/app-btn.vue'

defineProps<{
    order?: IOrder
}>()

const open = ref(false)
</script>