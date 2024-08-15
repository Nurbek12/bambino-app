<template>
    <div class="container mx-auto space-y-4 bg-white pt-4 pb-24">
        <div class="w-full flex items-center justify-between">
            <app-btn @click="router.back()">
                <BsArrowLeft class="text-white size-5" />
            </app-btn>

            <app-btn @click="store.add_to_saving(product)" class="cursor-pointer p-1.5 rounded-full text-white">
                <component :is="store.get_saved.find(p => p.id === product.id)?AnFilledHeart:AnOutlinedHeart" class="size-5" />
            </app-btn>
        </div>
        
        <div class="rounded-xl overflow-hidden w-full relative h-[250px]">
            <div class="absolute bottom-0 w-full py-2 flex items-center justify-center gap-2">
                <button class="cursor-pointer w-[12px] h-[12px] rounded-full"
                    v-for="i in 5" :key="i"
                    @click="current_color = i"
                    :class="current_color===i?'bg-primary-500':'bg-white'" />
            </div>
            <img :src="product.images[0].url" class="w-full h-full object-cover" alt="">
        </div>
        
        <h1 class="text-xl">{{ product.name }}</h1>
        
        <div>
            <h2 class="">Описания</h2>
            <p class="text-gray-600">{{ product.description }}</p>
        </div>

        <div class="px-4 py-2 space-y-2 rounded-xl bg-gray-100">
            <stars :model-value="product.rate" />
            <div class="flex items-center justify-between gap-6">
                <span class="text-sm text-gray-600"><b>{{ product.rate }}</b> Балл</span>
                <span class="text-sm text-gray-600"><b>{{ product.reviews.length }}</b> Отзывы</span>
                <span class="text-sm text-gray-600"><b>{{ product.count_of_sales }}</b> Покупки</span>
                <span class="text-sm text-gray-600"><b>{{ product.count_in_stock }}</b> На склад</span>
            </div>
        </div>

        <div>
            <div class="flex gap-4 items-center">
                <app-btn class="text-white px-4 w-full">Добавить отзыв ({{ product.reviews.length }})</app-btn> 
                
                <div class="w-full flex items-center justify-between gap-2">
                    <template v-if="!store.get_cart.find(p => p.id === product.id)">
                        <app-btn @click="store.add_to_cart(product)" class="text-white w-full">
                            Добавить в корзину
                        </app-btn>
                    </template>
                    <template v-else>
                        <app-btn @click="store.add_to_cart(product)" class="text-white">
                            <AkPlus class="size-6" />
                        </app-btn>
                        <div class="flex-1 py-2 text-center rounded-xl bg-primary-500 text-white">
                            {{ store.get_cart.find(p => p.id === product.id)?.quantity }}
                        </div>
                        <app-btn @click="store.remove_from_cart(product)" class="text-white">
                            <AkMinus class="size-6" />
                        </app-btn>
                    </template>
                </div>
            </div>
            <div class="space-y-4 py-2">
                <review v-for="r in product.reviews" :key="r.id" :review="r" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { ref, computed } from 'vue'
import { products } from '@/constants'
import Stars from '@/components/stars.vue'
import Review from '@/components/review.vue'
import { IProduct } from '@/constants/types'
import AppBtn from '@/components/app-btn.vue'
import { useRoute, useRouter } from 'vue-router'
import { AnFilledHeart, AnOutlinedHeart, BsArrowLeft, AkPlus, AkMinus } from '@kalimahapps/vue-icons'

const store = useStore()
const route = useRoute()
const router = useRouter()
const current_color = ref(0)

const product = computed<IProduct>(() => products.find(p => p.id == route.params.id))
</script>