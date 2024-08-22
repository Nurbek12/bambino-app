import api from '.'
import { IReport } from '@/constants/types'

export const get_reports = (params: any) => api.get<{data: IReport[], count: number}>(`/api/reports`, { params })

export const create_report = (body: Partial<IReport>) => api.post<{data: IReport, rate: number}>(`/api/reports`, body)

export const update_report = (id: number, body: Partial<IReport>) => api.put<{data: IReport}>(`/api/reports/${id}`, body)

export const delete_report = (id: number) => api.delete<{data: boolean}>(`/api/reports/${id}`)