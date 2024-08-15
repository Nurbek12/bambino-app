<template>
    <div class="container mx-auto space-y-4 bg-white pt-4 pb-24">
        <div class="flex items-center gap-2">

            <div class="relative flex items-center gap-4 rounded-xl bg-gray-100 w-full px-4">
                <AkSearch class="size-5" />
                <input type="text" class="py-2 outline-none bg-transparent w-full" placeholder="Поиск продуктов">
            </div>

            <app-btn>
                <SuFiltering class="size-6 text-white" />
            </app-btn>

        </div>
        <div class="overflow-auto">
            <div class="flex items-center gap-2">

                <div v-for="category in categories" :key="category.id" class="cursor-pointer flex gap-2 items-center px-4 py-1 rounded-xl"
                    :class="category.id === 1 ? 'bg-primary-500 hover:bg-primary-600 text-white' : 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300'">
                    <div class="w-[30px]">
                        <img :src="category.image" class="w-full h-full object-cover">
                    </div>
                    <span class="text-nowrap">{{ category.name }}</span>
                </div>

            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <product v-for="product in products" :key="product.id" :product="product" />
        </div>
    </div>
</template>

<script setup lang="ts">
import AppBtn from '@/components/app-btn.vue'
import Product from '@/components/product.vue'
import { products, categories } from '@/constants'
import { AkSearch, SuFiltering } from '@kalimahapps/vue-icons'
</script>