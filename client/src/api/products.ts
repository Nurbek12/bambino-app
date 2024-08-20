import api from '.'
import { IProduct, IImage } from '@/constants/types'

export const get_products = (params: any) => api.get<{data: IProduct[], count: number}>(`/api/products`, { params })

export const get_product = (id: number) => api.get<{data: IProduct}>(`/api/products/${id}`)

export const create_product = (body: Partial<IProduct>) => api.post<{data: IProduct}>(`/api/products`, body)

export const update_product = (id: number, body: Partial<IProduct>) => api.put<{data: IProduct}>(`/api/products/${id}`, body)

export const delete_product = (id: number) => api.delete<{data: boolean}>(`/api/products/${id}`)

export const add_image = (id: number, body: FormData) => api.post<{data: IImage[]}>(`/api/products/add_image/${id}`, body)

export const delete_image = (id: number) => api.delete<{data: boolean}>(`/api/products/remove_image/${id}`)