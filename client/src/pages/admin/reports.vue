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
            <template #table-item-user="{tableItem}">
                <span class="text-xs">{{ tableItem.user?.first_name }} {{ tableItem.user?.last_name }}</span>
            </template>
            <template #table-item-status="{tableItem}">
                <span class="text-xs text-primary-500">{{ report_statuses[tableItem.status as keyof typeof report_statuses || 'pending'] }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <!-- <app-btn @click="openOrder(tableItem.id!, index)">
                        <AkShoppingBag class="w-4 h-4 text-white" />
                    </app-btn> TODO: update status to finish -->
                    <app-btn @click="openOrder(tableItem.id!, index)">
                        <AkShoppingBag class="w-4 h-4 text-white" />
                    </app-btn>
                    <app-btn @click="deleteItem(tableItem.id!, index)">
                        <MdDelete class="w-4 h-4 text-white" />
                    </app-btn>
                </div>
            </template>
        </app-table>
    </div>
    <app-dialog title="Детали заказа" :max_w="500" :model-value="view_order!==null" @close-dialog="view_order=null">
        <order hide_report v-if="view_order!==null" :order="items[view_order].order" />
    </app-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { get_order } from '@/api/orders'
import Order from '@/components/order.vue'
import { IReport } from '@/constants/types'
import { report_statuses } from '@/constants'
import AppBtn from '@/components/app-btn.vue'
import AppTable from '@/components/app-table.vue'
import AppDialog from '@/components/app-dialog.vue'
import { get_reports, delete_report } from '@/api/reports'
import { MdDelete, AkShoppingBag } from '@kalimahapps/vue-icons'

const count = ref(0)
const loading = ref(false)
const items = ref<IReport[]>([])
const view_order = ref<null|number>(null)

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
    { name: "Имя и Фамилия", value: "user", sortable: false, balancedText: false, custom: true },
    { name: "Сообщения", value: "text", sortable: false, balancedText: true, custom: false },
    { name: "Статус", value: "status", sortable: true, balancedText: false, custom: true },
    { name: "Добавлено", value: "created_at", sortable: true, balancedText: false, custom: true },
    { name: "Управлять", value: "actions", sortable: false, balancedText: false, custom: true },
]

const deleteItem = async (id: number, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    await delete_report(id)
    items.value.splice(index, 1)
}

const openOrder = async (id: number, index: number) => {
    if(!items.value[index]?.order) {
        const { data } = await get_order(id)
        items.value[index].order = data.data
    }
    view_order.value = index
}

// TODO: Add public reviews

const get_items = async (params: any) => {
    try {
        loading.value = true
        const { data } = await get_reports(params)
        items.value = data.data
        count.value = data.count
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }

}
</script>