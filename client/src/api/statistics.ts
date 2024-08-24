import api from '.'
import { IStatistics } from '@/constants/types'

export const get_statistics = () => api.get<{data: IStatistics[]}>(`/api/statistics`)

export const get_statistics_count = () => api.get<{data: { users_count: number, orders_count: number, reports_count: number, products_count: number }}>(`/api/statistics/counts`)
