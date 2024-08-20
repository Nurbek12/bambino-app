import api from '.'
import { IOrder } from '@/constants/types'
 
export const get_orders = (params: any) => api.get<{data: IOrder[], count: number}>(`/api/orders`, { params })

export const get_order = (id: number) => api.get<{data: IOrder}>(`/api/orders/id/${id}`)

export const get_my_orders = (id: number, params: any = {}) => api.get<{data: IOrder[], count: number}>(`/api/orders/my/${id}`, { params })

export const get_delivery = () => api.get<{data: IOrder[], count: number}>(`/api/orders/delivery`)

export const create_order = (body: any) => api.post<{data: IOrder}>(`/api/orders`, body)

export const update_order = (id: number, body: any) => api.patch<{data: IOrder}>(`/api/orders`, body)

export const delete_order = (id: number) => api.delete<{data: boolean}>(`/api/orders/${id}`)