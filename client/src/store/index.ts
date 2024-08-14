import { defineStore } from 'pinia'
import { IProduct } from '../constants/types'

export const useStore = defineStore('app', {
    state: () => ({
        cart: JSON.parse(localStorage.getItem('app-cart')||"[]") as IProduct[],
        saved: JSON.parse(localStorage.getItem('app-saved')||"[]") as IProduct[],
    }),
    getters: {
        get_cart: state => state.cart,
        get_total: state => state.cart.reduce((a, b) => {
            return a + (b.price - b.price * b.discount) // TODO: change discount
        }, 0).toFixed(2),
        get_saved: state => state.saved,
    },
    actions: {
        add_to_saving(product: IProduct) {
            const p_index = this.get_saved.findIndex(p => p.id === product.id)
            p_index > -1 ? this.saved.splice(p_index, 1) : this.saved.push(product) 

            this.set_local_storage('app-saved', this.get_saved)
        },
        add_to_cart(product: IProduct) {
            const p_index = this.get_cart.findIndex(p => p.id === product.id)
            p_index > -1 ? this.cart[p_index].quantity++ : this.cart.push({...product, quantity: 1}) 

            this.set_local_storage('app-cart', this.get_cart)
        },
        remove_from_cart(product: IProduct) {
            const p_index = this.get_cart.findIndex(p => p.id === product.id)
            if(p_index > -1) {
                this.cart[p_index].quantity > 1 ?
                    this.cart[p_index].quantity-- :
                    this.cart.splice(p_index, 1)
            }

            this.set_local_storage('app-cart', this.saved)
        },
        set_local_storage(key: string, item: any) {
            localStorage.setItem(key, JSON.stringify(item))
        }
    }
})