import api from '.'
import { IUser } from '@/constants/types'

export const get_users = (params: any) => api.get<{data: IUser[], count: number}>(`/api/users`, { params })

export const get_me = (id: number) => api.get<{data: IUser}>(`/api/users/me/${id}`)

export const create_user = (body: Partial<IUser>) => api.post<{data: IUser}>(`/api/users`, body)

export const update_user = (id: number, body: Partial<IUser>) => api.put<{data: IUser}>(`/api/users/${id}`, body)

export const delete_user = (id: number) => api.delete<{data: boolean}>(`/api/users/${id}`)