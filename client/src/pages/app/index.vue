<template>
    <div class="relative w-full h-full bg-white">
        <router-view />
        <bottom-nav />
    </div>
</template>

<script setup lang="ts">
import BottomNav from '@/components/bottom-nav.vue'
</script>