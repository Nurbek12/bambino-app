<template>
    <div class="container mx-auto space-y-4 bg-white py-4 pb-24">
        <div class="grid grid-cols-1 gap-4">
            <cart-product v-for="product in store.get_cart" :key="product.id" :product="product" />
        </div>
        <div class="w-full">
            <div class="w-full bg-gray-100 hover:bg-gray-200 flex cursor-pointer justify-between items-center px-4 py-2"
                :class="!show_location?'rounded-2xl':'rounded-t-2xl border-b-0'" @click="show_location=!show_location">
                <h1>Адрес и Местоположения</h1>
                <component :is="!show_location?AkChevronDown:AkChevronUp" />
            </div>
            <div v-show="show_location" class="w-full bg-gray-100 p-2 rounded-b-2xl">
                <div class="flex items-center gap-4">
                    <app-input v-model="location.address" class="w-full" placeholder="Напишите свой адрес" />
                    <app-btn @click="giveLocation">
                        <JaFillMapMarker class="text-white" />
                    </app-btn>
                </div>
                <div v-if="location.coordinates.lat!==0" class="mt-4 w-full h-[250px] rounded-xl overflow-hidden">
                    <mgl-map
                        v-model:zoom="zoom"
                        map-style="https://api.maptiler.com/maps/streets/style.json?key=cQX2iET1gmOW38bedbUh"
                        :center="center">
                        <mgl-marker :draggable="true" v-model:coordinates="location.coordinates" color="red" />
                        <mgl-navigation-control />
                    </mgl-map>
                </div>
            </div>
        </div>
        <app-btn @click="handle_order" v-show="store.get_cart.length>0" class="w-full text-white">Заказать ({{store.get_total?.toLocaleString('en-EN')}}) сумов</app-btn>
        <div v-show="store.get_cart.length===0" class="flex justify-center items-center">
            <h1 class="text-gray-500">Нет продуктов</h1>
        </div>
        <Alert message="Покупка успешно создано!" v-if="show_alert" />
    </div>
</template>

<script setup lang="ts">
import 'maplibre-gl/dist/maplibre-gl.css'

import { Alert } from 'vue-tg'
import { useStore } from '@/store'
import { reactive, ref } from 'vue'
import { create_order } from '@/api/orders'
import AppBtn from '@/components/app-btn.vue'
import AppInput from '@/components/app-input.vue'
import CartProduct from '@/components/cart-product.vue'
import { AkChevronDown, AkChevronUp, JaFillMapMarker } from '@kalimahapps/vue-icons'
import { MglMap, MglMarker, MglNavigationControl } from '@indoorequal/vue-maplibre-gl'

const zoom = ref(16)
const store = useStore()
const show_alert = ref(false)
const show_location = ref(false)
const center = ref<any>([store.user?.longitude||0, store.user?.latitude||0])

const location = reactive({
    address: "",
    coordinates: { "lng": store.user?.longitude||0, "lat": store.user?.latitude||0 }
})

const handle_order = async () => {
    await create_order({
        address: location.address,
        longitude: location.coordinates.lng,
        latitude: location.coordinates.lat,
        status: 'pending',
        total: store.get_total,
        user_id: store.user?.id,
        body_order_items: store.get_cart.map(({id, quantity}) => ({product_id: id, quantity})),
    })
    show_alert.value = true
    store.cart = []
    localStorage.removeItem('app-cart')
    setTimeout(() => {
        show_alert.value = false
    }, 3000)
}

const giveLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            location.coordinates.lat = position.coords.latitude;
            location.coordinates.lng = position.coords.longitude;
            center.value = [position.coords.longitude, position.coords.latitude];
        },
        (error) => {
            console.error('Error getting geolocation:', error);
        }
        )
    }
} 
</script>
