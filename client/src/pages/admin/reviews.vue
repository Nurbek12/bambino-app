<template>
    <div class="w-full p-2">
        <app-table
            :headers="headers"
            :items="items"
            :count="count"
            :loading="loading"
            @fetching="get_items">
            <template #table-top>
                <div class="hidden lg:block"></div>
                <div class="hidden lg:block"></div>
            </template>
            <template #table-item-created_at="{tableItem}">
                <span class="text-xs">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <app-btn @click="deleteItem(tableItem.id!, index)">
                        <MdDelete class="w-4 h-4 text-white" />
                    </app-btn>
                </div>
            </template>
        </app-table>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IReview } from '@/constants/types'
import AppBtn from '@/components/app-btn.vue'
import AppTable from '@/components/app-table.vue'
import { MdDelete } from '@kalimahapps/vue-icons'
import { get_reviews, delete_review } from '@/api/reviews'

const count = ref(0)
const loading = ref(false)
const items = ref<IReview[]>([])

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
    { name: "Имя", value: "user.first_name", sortable: true, balancedText: false, custom: false },
    { name: "Фамилия", value: "user.last_name", sortable: true, balancedText: true, custom: false },
    { name: "Сообщения", value: "text", sortable: false, balancedText: false, custom: false },
    { name: "Бал", value: "rate", sortable: false, balancedText: false, custom: false },
    { name: "Добавлено", value: "created_at", sortable: true, balancedText: false, custom: true },
    { name: "Управлять", value: "actions", sortable: false, balancedText: false, custom: true },
]

const deleteItem = async (id: number, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    await delete_review(id)
    items.value.splice(index, 1)
}

// TODO: Add public reviews

const get_items = async (params: any) => {
    try {
        loading.value = true
        const { data } = await get_reviews(params)
        items.value = data.data
        count.value = data.count
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }

}
</script>