import axios, {} from 'axios'
import { useStore } from '@/store'

export const baseURL = import.meta.env.VITE_PROXY_URL || ''

const store = useStore()
const api = axios.create({ baseURL })

api.interceptors.request.use(
    (config) => {
        checkToken()
        return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

api.interceptors.response.use(
    (resp) => {
        return resp
    },
    (err) => {
        if(err.response && (err.response.status === 401 || err.response.status === 405)) {
            // store.log_out()
            return
        }
        return Promise.reject(err)
    }
)

export const checkToken = () => {
    const token = store.token||''
    api.defaults.headers.common.Authorization = `Bearer ${token}`
}

checkToken()

export default api