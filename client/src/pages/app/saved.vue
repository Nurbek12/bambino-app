<template>
    <div class="container mx-auto space-y-4 bg-white pt-4 pb-24">
        <div class="grid grid-cols-2 gap-4">
            <product v-for="product in store.get_saved" :key="product.id" :product="product" />
        </div>
        <div v-show="store.get_saved.length===0" class="flex justify-center items-center">
            <h1 class="text-gray-500">Нет продуктов</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import Product from '@/components/product.vue'

const store = useStore()
</script>
