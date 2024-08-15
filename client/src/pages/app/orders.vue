<template>
    <div class="container mx-auto space-y-4 bg-white pt-4 pb-24">
        <div class="flex items-center gap-2">
            <button class="w-full py-1.5 cursor-pointer rounded-xl px-2 text-nowrap" v-for="st,i in Object.keys(order_statuses)" :key="i"
                :class="st===status?'bg-primary-500 hover:bg-primary-600 text-white':'bg-gray-100 hover:bg-gray-200 active:bg-gray-300'" @click="status=st">
                {{ order_statuses[st as keyof typeof order_statuses] }}
            </button>
        </div>
        <div v-show="0" class="flex justify-center items-center">
            <h1 class="text-lg text-gray-500">Нет покупки</h1>
        </div>
        <div class="grid grid-cols-1 gap-4">
            <order v-for="i in 7" :key="i" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Order from '@/components/order.vue'
import { order_statuses } from '@/constants'

const status = ref('pending')
</script>
