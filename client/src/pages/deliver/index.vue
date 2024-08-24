<template>
    <div class="h-screen w-full flex flex-col gap-2 relative">
        <div class="w-full flex-1" v-if="courierPosition[0] !== 0 && courierPosition[1] !== 0">
            <mgl-map
                :map-style="'https://api.maptiler.com/maps/streets/style.json?key=cQX2iET1gmOW38bedbUh'"
                :center="(courierPosition as any)"
                v-model:zoom="zoom"
                @map:load="loadMap">
                <mgl-marker :coordinates="(courierPosition as any)" color="red">
                    <mgl-popup>
                        Курьер - Это вы
                    </mgl-popup>
                </mgl-marker>
                <mgl-navigation-control />
                <mgl-marker v-for="order in orders" :coordinates="[order.longitude, order.latitude]" :key="order.id" :color="{'pending':'blue','finish':'green','canceled':'amber'}[order.status]">
                    <mgl-popup>
                        <div>
                            {{ order.user?.first_name }} {{ order.user?.last_name }} - {{ order.user?.phone }}
                        </div>
                        <div v-show="nearbyOrderId===order.id">
                            <app-btn class="w-full text-white">Заказ доставлен</app-btn>
                        </div>
                    </mgl-popup>
                </mgl-marker>
            </mgl-map>
        </div>
        <div class="container w-full pb-4 py-2">
            <app-btn class="w-full text-white">Посмотреть заказов</app-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import 'maplibre-gl/dist/maplibre-gl.css'

import polyline from '@mapbox/polyline'
import { Marker } from 'maplibre-gl'
import { IOrder } from '@/constants/types'
import AppBtn from '@/components/app-btn.vue'
import { onMounted, ref, computed } from 'vue';
import { MglMap, MglNavigationControl, MglMarker, MglPopup } from '@indoorequal/vue-maplibre-gl'

const zoom = ref(14)
const courierPosition = ref<number[]>([0, 0])
const orders = ref<IOrder[]>([
  {
    "id": 1,
    "status": "pending",
    "total": 28500,
    "user_tg_id": null,
    "user_id": 1,
    "address": null,
    "geolocation": null,
    "is_reported": true,
    "latitude": 40.028909,
    "longitude": 64.825715,
    "created_at": "2024-08-23T13:29:41.800Z",
    "updated_at": "2024-08-23T13:49:24.078Z",
    "user": {
      "id": 1,
      "first_name": "Nurbek",
      "last_name": "",
      "address": "",
      "geolocation": null,
      "phone": "998939060512"
    }
  },
  {
    "id": 2,
    "status": "finish",
    "total": 9500,
    "user_tg_id": null,
    "user_id": 1,
    "address": null,
    "geolocation": null,
    "is_reported": false,
    "latitude": 40.034787,
    "longitude": 64.83785,
    "created_at": "2024-08-23T13:45:44.767Z",
    "updated_at": "2024-08-23T13:48:05.042Z",
    "user": {
      "id": 1,
      "first_name": "Nurbek",
      "last_name": "",
      "address": "",
      "geolocation": null,
      "phone": "998939060512"
    }
  },
  {
    "id": 3,
    "status": "canceled",
    "total": 47500,
    "user_tg_id": null,
    "user_id": 1,
    "address": null,
    "geolocation": null,
    "is_reported": false,
    "latitude": 40.028856,
    "longitude": 64.832323,
    "created_at": "2024-08-23T13:45:51.918Z",
    "updated_at": "2024-08-23T13:48:05.042Z",
    "user": {
      "id": 1,
      "first_name": "Nurbek",
      "last_name": "",
      "address": "",
      "geolocation": null,
      "phone": "998939060512"
    }
  },
  {
    "id": 4,
    "status": "pending",
    "total": 19000,
    "user_tg_id": null,
    "user_id": 1,
    "address": null,
    "geolocation": null,
    "is_reported": false,
    "latitude": 40.025437,
    "longitude": 64.827716,
    "created_at": "2024-08-23T13:45:57.323Z",
    "updated_at": "2024-08-23T13:48:05.042Z",
    "user": {
      "id": 1,
      "first_name": "Nurbek",
      "last_name": "",
      "address": "",
      "geolocation": null,
      "phone": "998939060512"
    }
  }
] as any)

const sortedOrders = computed(() => {
    return orders.value.sort((a, b) => {
        const distanceA = haversineDistance(courierPosition.value[0], courierPosition.value[1], a.latitude, a.longitude);
        const distanceB = haversineDistance(courierPosition.value[0], courierPosition.value[1], b.latitude, b.longitude);
        return distanceA - distanceB;
    });
})

const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

const loadMap = ({map}: any) => {
      let url1 = new URL("https://maptoolkit.p.rapidapi.com/route");
      url1.searchParams.append("point", `${courierPosition.value[1]},${courierPosition.value[0]}`);
      sortedOrders.value.map(o => {
        url1.searchParams.append("point", `${o.latitude},${o.longitude}`);
      })
        url1.searchParams.append("routeType", "car");
      url1.searchParams.append("rapidapi-key", "2d5d8ea9ccmsh08eb851594888f2p191856jsn29dbe103be34");
      fetch(url1)
        .then((r) => r.json())
        .then((route) => {
            let path = route.paths[0]
            let coordinates = polyline.decode(path.points).map((c: any) => c.reverse());
            map.addLayer({
                id: "route",
                type: "line",
                source: {
                    type: "geojson",
                    data: {
                    type: "Feature",
                        geometry: {
                            type: "LineString",
                            coordinates: coordinates,
                        },
                    },
                },
                layout: {
                    "line-join": "round",
                    "line-cap": "round",
                },
                paint: {
                    "line-color": "#2a3561",
                    "line-width": 5,
                },
            });
            // Add instruction markers with popup to map
            path.instructions.forEach((instruction: any) => {
                let $img = document.createElement("img");
                $img.src = "https://static.maptoolkit.net/sprites/maptoolkit/route-via.svg";
                $img.width = 12;
                $img.height = 12;
                $img.style["cursor"] = "pointer";
                new Marker({
                    element: $img,
                    anchor: "center",
                })
                .setLngLat(instruction.coordinate.reverse())
                .addTo(map)
            });
            
            let $img = document.createElement("img");
            $img.src = "https://static.maptoolkit.net/sprites/maptoolkit/marker.svg";
            $img.width = 29;
            $img.height = 30;
            new Marker({
                element: $img,
                anchor: "bottom",
            })
            .setLngLat(coordinates[0])
            .addTo(map);
            
        }).catch(error => {
        console.log(error)
    })
}

const nearbyOrderId = computed(() => {
    for (const order of orders.value) {
    const distance = haversineDistance(courierPosition.value[0], courierPosition.value[1], order.latitude, order.longitude);
    if (distance <= 0.005) {
        return order.id;
    }
    }
    return null;
})

onMounted(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                courierPosition.value = [position.coords.longitude, position.coords.latitude];
            },
            (error) => {
                console.error('Error getting geolocation:', error);
            }
        )

        navigator.geolocation.watchPosition(
          (position) => {
            courierPosition.value = [position.coords.longitude, position.coords.latitude];
          },
          (error) => {
            console.error('Error watching geolocation:', error);
          }
        )
      }
});
</script>