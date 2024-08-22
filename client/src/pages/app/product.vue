<template>
    <div class="container mx-auto space-y-4 bg-white pt-4 pb-24">
        <div class="w-full flex items-center justify-between">
            <app-btn @click="router.back()">
                <BsArrowLeft class="text-white size-5" />
            </app-btn>
            <span class="bg-green-600 text-sm text-white px-4 py-2 rounded-xl">{{ product.category?.name }}</span>
            <app-btn @click="store.add_to_saving(product as any)" class="cursor-pointer p-1.5 rounded-full text-white">
                <component :is="store.get_saved.find(p => p.id === product.id)?AnFilledHeart:AnOutlinedHeart" class="size-5" />
            </app-btn>
        </div>
        
        <div class="rounded-xl overflow-hidden w-full relative h-[250px]">
            <img :src="baseURL+'/'+product.images?.[current_image]?.url" class="w-full h-full object-cover" alt="">
        </div>

        <div>
            <div class="w-full flex items-center justify-center gap-2">
                <button class="cursor-pointer p-1 w-[55px] h-[55px] rounded-2xl"
                    v-for="img,i in product.images||[]" :key="i" @click="current_image = i"
                    :class="current_image===i?'bg-primary-500':'bg-white'">
                    <img :src="baseURL +'/'+ img.url" class="rounded-xl object-cover w-full h-full" />
                </button>
            </div>
        </div>
        
        <h1 class="text-xl">{{ product.name || '' }}</h1>
        
        <div>
            <h2 class="">Описания</h2>
            <p class="text-gray-600">{{ product.description || '' }}</p>
        </div>

        <div class="px-4 py-2 space-y-2 rounded-xl bg-gray-100">
            <stars :model-value="product.rate||0" readonly />
            <div class="flex items-center justify-between gap-6">
                <span class="text-sm text-gray-600"><b>{{ product.rate || 0 }}</b> Балл</span>
                <span class="text-sm text-gray-600"><b>{{ product.reviews?.length || 0 }}</b> Отзывы</span>
                <span class="text-sm text-gray-600"><b>{{ product.sold || 0 }}</b> Покупки</span>
                <span class="text-sm text-gray-600"><b>{{ product.stock_count || 0 }}</b> На склад</span>
            </div>
        </div>

        <div>
            <div class="flex gap-4 items-center">
                <app-btn @click="dialog=true" class="text-white px-4 w-full">Добавить отзыв ({{ product.reviews?.length || 0 }})</app-btn> 
                
                <div class="w-full flex items-center justify-between gap-2">
                    <template v-if="!store.get_cart.find(p => p.id === product.id)">
                        <app-btn @click="store.add_to_cart(product as any)" class="text-white w-full">
                            Добавить в корзину
                        </app-btn>
                    </template>
                    <template v-else>
                        <app-btn @click="store.add_to_cart(product as any)" class="text-white">
                            <AkPlus class="size-6" />
                        </app-btn>
                        <div class="flex-1 py-2 text-center rounded-xl bg-primary-500 text-white">
                            {{ store.get_cart.find(p => p.id === product.id)?.quantity }}
                        </div>
                        <app-btn @click="store.remove_from_cart(product as any)" class="text-white">
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
    <app-dialog v-model="dialog" title="Добавите отзыв">
        <form @submit.prevent="hanle_create_review" class="w-full space-y-4">
            <app-textarea required v-model="review.text" class="w-full" placeholder="Текст отзыва" />
            <stars v-model="review.rate" />
            <app-btn class="w-full text-white">Отправить</app-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import { baseURL } from '@/api'
import { useStore } from '@/store'
import Stars from '@/components/stars.vue'
import { get_product } from '@/api/products'
import Review from '@/components/review.vue'
import { create_review } from '@/api/reviews'
import AppBtn from '@/components/app-btn.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, onBeforeMount, reactive } from 'vue'
import AppDialog from '@/components/app-dialog.vue'
import { IProduct, IReview } from '@/constants/types'
import AppTextarea from '@/components/app-textarea.vue'
import { AnFilledHeart, AnOutlinedHeart, BsArrowLeft, AkPlus, AkMinus } from '@kalimahapps/vue-icons'

const store = useStore()
const route = useRoute()
const dialog = ref(false)
const router = useRouter()
const current_image = ref(0)
const review = reactive<Partial<IReview>>({
    rate: 0,
    text: '',
    user_id: store.user?.id,
    product_id: +route.params.id,
})

const product = ref<Partial<IProduct>>({})

const init = async () => {
    const { data } = await get_product(+route.params.id)
    product.value = data.data
}

const hanle_create_review = async () => {
    dialog.value = false
    const { data } = await create_review(review)
    product.value.rate = data.rate
    product.value.reviews = [...product.value.reviews||[], data.data]
    Object.assign(review, {
        rate: 0,
        text: '',
    })
    alert('Успешно отправлено')
}

onBeforeMount(() => {
    init()
})
</script>