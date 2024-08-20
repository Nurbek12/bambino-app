import api from '.'
import { IReview } from '@/constants/types'

export const get_reviews = (params: any) => api.get<{data: IReview[], count: number}>(`/api/reviews`, { params })

export const create_review = (body: Partial<IReview>) => api.post<{data: IReview, rate: number}>(`/api/reviews`, body)

export const update_review = (id: number, body: Partial<IReview>) => api.put<{data: IReview}>(`/api/reviews/${id}`, body)

export const delete_review = (id: number) => api.delete<{data: boolean}>(`/api/reviews/${id}`)