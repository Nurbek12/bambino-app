import api from '.'
import { ICategory } from '@/constants/types'

export const get_categories = (params: any) => api.get<{data: ICategory[], count: number}>(`/api/categories`, { params })

export const create_category = (body: Partial<ICategory>) => api.post<{data: ICategory}>(`/api/categories`, body)

export const update_category = (id: number, body: Partial<ICategory>) => api.put<{data: ICategory}>(`/api/categories/${id}`, body)

export const delete_category = (id: number) => api.delete<{data: boolean}>(`/api/categories/${id}`)