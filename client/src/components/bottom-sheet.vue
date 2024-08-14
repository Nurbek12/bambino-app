<template>
    <div v-if="model" class="fixed w-full h-full">
        <div class="w-full">

        </div>
        <div class="w-full">
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
const model = defineModel({
    type: Boolean,
    default: false
})
</script>