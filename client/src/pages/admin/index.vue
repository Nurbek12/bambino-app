<template>
    <div class="flex">
        <nav-drawer />
        <main class="flex-1 h-[100vh] scrollbar-hide overflow-auto bg-gray-100 pl-[57px] md:pl-0">
            <router-view />
        </main>
    </div>
</template>

<script setup lang="ts">
import NavDrawer from '@/components/app-nav-drawer.vue'
</script>