<template>
    <main class="bg-gray-100 w-full h-screen flex items-center justify-center">
        <form @submit.prevent="handle_login" class="p-4 rounded-2xl bg-white border flex flex-col gap-2 w-full max-w-[380px]">
            <h1 class="text-primary-500 text-lg text-center">Войти в систему</h1>
            <app-input v-model="auth_data.login" required placeholder="Логин" />
            <app-input v-model="auth_data.password" type="password" required placeholder="Пароль" />
            <app-btn :disabled="loading" type="submit" class="text-white">Войти</app-btn>
        </form>
    </main>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { checkToken } from '@/api'
import { ref, reactive } from 'vue'
import { login } from '@/api/users'
import { useRouter } from 'vue-router'
import AppBtn from '@/components/app-btn.vue'
import AppInput from '@/components/app-input.vue'

const store = useStore()
const router = useRouter()
const loading = ref(false)
const auth_data = reactive({
    login: '',
    password: ''
})

const handle_login = async () => {
    try {
        loading.value = true
        const { data } = await login(auth_data)
        if(!data.data) return
        store.set_token(data.data)
        checkToken()
        router.push('/admin')
    } catch (error) {
        alert('Не правильный логин или пароль')
    } finally {
        loading.value = false
    }
}
</script>