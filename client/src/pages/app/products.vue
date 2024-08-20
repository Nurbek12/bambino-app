<template>
    <div class="container mx-auto space-y-4 bg-white pt-4 pb-24">
        <div class="flex items-center gap-2">

            <div class="relative flex items-center gap-4 rounded-xl bg-gray-100 w-full px-4">
                <AkSearch class="size-5" />
                <input @input="handle_search" type="text" class="py-2 outline-none bg-transparent w-full" placeholder="Поиск продуктов">
            </div>

            <app-btn @click="dialog_filter=true">
                <SuFiltering class="size-6 text-white" />
            </app-btn>

        </div>

        <chip-group v-model="filters.category" :list="categories" />

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <product v-for="product in products" :key="product.id" :product="product" />
        </div>

        <div class="flex items-center flex-col gap-2 w-full">
            <h1 class="text-gray-500" v-show="products.length===0">Нет продуктов</h1>
            <h1 class="text-gray-500 animate-pulse" v-show="loading">Загрузка продуктов...</h1>
            <app-btn @click="load_products" class="text-white px-4" v-show="products.length>products_count">Загружать еще</app-btn>
        </div>

    </div>
    <bottom-sheet v-model="dialog_filter">
        <div class="overflow-auto space-y-4">
            <chip-group v-model="filters.category" :list="categories" :icon="CoListFilter" title="Филтровать по категории" />

            <chip-group v-model="sorting_number" :list="product_sortings" :icon="BsSortDownAlt" title="Сортитовать товаров" />
        </div>
    </bottom-sheet>
</template>

<script setup lang="ts">
import lodash from 'lodash'
import { reactive, ref, computed } from 'vue'
import AppBtn from '@/components/app-btn.vue'
import { get_products } from '@/api/products'
import { product_sortings } from '@/constants'
import Product from '@/components/product.vue'
import { get_categories } from '@/api/categories'
import ChipGroup from '@/components/chip-group.vue'
import { IProduct, ICategory } from '@/constants/types'
import bottomSheet from '@/components/bottom-sheet.vue'
import { AkSearch, SuFiltering, CoListFilter, BsSortDownAlt } from '@kalimahapps/vue-icons'

const loading = ref(false)
const products_count = ref(0)
const dialog_filter = ref(false)
const products = ref<IProduct[]>([])
const categories = ref<ICategory[]>([])
const sorting_number = ref<null|number>(null)
const filters = reactive({
    page: 1,
    price: 0,
    limit: 10,
    search: '',
    category: null as number | null,
})
const safe_filters = computed(() => {
    const obj: any = {}

    Object.keys(filters).map(k => 
        filters[k as keyof typeof filters] && 
        (obj[k] = filters[k as keyof typeof filters]))

    sorting_number.value !== null &&
        (obj.sorting = product_sortings[sorting_number.value])

    return obj
})

const handle_search = lodash.debounce(async e => {
    const text = e.target.value
    if(!text?.trim() && text !== '') return
    
    filters.search = text
    await handle_products(true)
}, 500)

const handle_products = async (filtered?: boolean) => {
    try {
        loading.value = true
        const { data } = await get_products(safe_filters.value)
        
        if(products.value.length === 0 || filtered) {
            products.value = data.data
            products_count.value = data.count
        } else {
            products.value.concat(data.data)
        }
    } catch (error) {
        console.log(false);
    } finally {
        loading.value = false
    }
}

const load_products = () => {
    filters.page++
    handle_products()
}

const init = async () => {
    const [c,_] = await Promise.all([
        get_categories({page:1, limit: 100}),
        handle_products()
    ])
    categories.value = c.data.data
}

init()
</script>