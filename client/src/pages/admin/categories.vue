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
                <app-btn class="rounded-[0.25rem] text-white text-sm" @click="dialog=true">Добавить</app-btn>
            </template>
            <template #table-item-image="{tableItem}">
                <div class="w-[40px] h-[40px] overflow-hidden rounded-xl bg-slate-100">
                    <img :src="baseURL + '/' + tableItem.image || '/nophoto.jpg'" class="w-full h-full object-cover">
                </div>
            </template>
            <template #table-item-created_at="{tableItem}">
                <span class="text-xs">{{ new Date(tableItem.created_at!).toLocaleString() }}</span>
            </template>
            <template #table-item-category="{tableItem}">
                <span class="text-xs px-2 py-1 rounded-xl bg-green-500 text-white">{{ tableItem.parent?.name || '-' }}</span>
            </template>
            <template #table-item-actions="{tableItem,index}">
                <div class="flex gap-1">
                    <app-btn @click="editItem(tableItem, index)" >
                        <BxSolidPencil class="w-4 h-4 text-white" />
                    </app-btn>
                    <app-btn @click="deleteItem(tableItem.id!, index)">
                        <MdDelete class="w-4 h-4 text-white" />
                    </app-btn>
                </div>
            </template>
        </app-table>
    </div>
    <app-dialog :title="itemIndex==null?'Добавить продукт':'Изменить продукта'" :max_w="600" v-model="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
            <app-input required v-model="item.name" type="text" placeholder="Название" />
            <app-select :items="items.filter(i => i.id !== item.id)" name="name" value="id" placeholder="Родительская категория" />
            <app-textarea required v-model="item.description" type="text" placeholder="Описание" />

            <div class="flex gap-2 items-center">
                <app-btn @click="clickToInput()" class="w-min rounded-[0.25rem] px-4 text-white text-sm" type="button">
                    Добавить фотографию
                </app-btn>
                <div class="w-[40px] h-[40px] overflow-hidden rounded-xl bg-slate-300">
                    <img :src="currentImage" class="w-full h-full object-cover">
                </div>
                <input @change="(e:any) => image=e.target.files[0]" type="file" id="files" accept="image/*" hidden>
            </div>

            <app-btn class="rounded-[0.25rem] text-white text-sm" :disabled="createLoading" type="submit">
                {{ createLoading?'Загружается':'Сохранить' }}
            </app-btn>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import { baseURL } from '@/api'
import { ref, reactive, computed } from 'vue'
import { ICategory } from '@/constants/types'
import AppBtn from '@/components/app-btn.vue'
import AppInput from '@/components/app-input.vue'
import AppTable from '@/components/app-table.vue'
import AppDialog from '@/components/app-dialog.vue'
import AppSelect from '@/components/app-select.vue'
import AppTextarea from '@/components/app-textarea.vue'
import { MdDelete, BxSolidPencil } from '@kalimahapps/vue-icons'
import { create_category, delete_category, get_categories, update_category } from '@/api/categories'

const count = ref(0)
const dialog = ref(false)
const loading = ref(false)
const image = ref<any>(null)
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const items = ref<ICategory[]>([])

const headers = [
    { name: "ID", value: "id", sortable: true, balancedText: false, custom: false },
    { name: "Фото", value: "image", sortable: false, balancedText: false, custom: true },
    { name: "Название", value: "name", sortable: true, balancedText: false, custom: false },
    { name: "Описание", value: "description", sortable: false, balancedText: true, custom: false },
    { name: "Категория", value: "category", sortable: false, balancedText: false, custom: true },
    { name: "Добавлено", value: "created_at", sortable: false, balancedText: false, custom: true },
    { name: "Управлять", value: "actions", sortable: false, balancedText: false, custom: true },
]

const currentImage = computed(() => {
    if(item.image) return baseURL + '/' + item.image
    else if(image.value) return URL.createObjectURL(image.value)
    return '/nophoto.jpg'
})

const item = reactive<Partial<ICategory>>({
    name: "",
    description: "",
})

const clickToInput = () => {
    document.getElementById('files')?.click()
}

const editItem = (el: Partial<ICategory>, index: number) => {
    Object.assign(item, el)
    itemIndex.value = index
    dialog.value = true
}

const deleteItem = async (id: number, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    await delete_category(id)
    items.value.splice(index, 1)
}

const add = async (body: any) => {
    const { data } = await create_category(body)
    items.value.push(data.data)
}

const update = async (index: number, id: number, body: any) => {
    const { data } = await update_category(id, body)
    Object.assign(items.value[index], data.data)
}

const save = async () => {
    try {
        createLoading.value = true
        
        const formdata = new FormData()

        image.value && formdata.append('image', image.value)
        
        Object.keys(item).map(k => ![null, undefined].includes(item[k as keyof ICategory] as any) && formdata.append(k, item[k as keyof ICategory] as any))

        formdata.delete('id')
        formdata.delete('created_at')
        formdata.delete('updated_at')
        
        if(itemIndex.value !== null) await update(itemIndex.value, item.id!, formdata)
        else await add(formdata)
        close()
    } catch (error: any) {
        console.log(error)
    } finally {
        createLoading.value = false
    }
}

const get_items = async (params: any) => {
    try {
        loading.value = true
        const { data } = await get_categories(params)
        items.value = data.data
        count.value = data.count
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }

}

const close = () => {
    Object.assign(item, {
        name: "",
        description: "",
    })
    image.value = null
    dialog.value = false
    itemIndex.value = null
}
</script>