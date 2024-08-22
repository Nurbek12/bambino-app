import cookies from 'js-cookie'
import { defineStore } from 'pinia'
import { IProduct, IUser } from '../constants/types'

export const useStore = defineStore('app', {
    state: () => ({
        token: cookies.get('app-token') || null,
        user: JSON.parse(localStorage.getItem('app-user')||"null") as IUser|null,
        cart: JSON.parse(localStorage.getItem('app-cart')||"[]") as IProduct[],
        saved: JSON.parse(localStorage.getItem('app-saved')||"[]") as IProduct[],
    }),
    getters: {
        get_cart: state => state.cart,
        get_user: state => state.user,
        is_authencated: state => !!state.token,
        get_total: state => state.cart.reduce((a, b) => {
            return a + (b.quantity! * (b.price! - (b.price! * b.discount! / 100)))
        }, 0),
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
            p_index > -1 ? this.cart[p_index].quantity!++ : this.cart.push({...product, quantity: 1}) 

            this.set_local_storage('app-cart', this.get_cart)
        },
        remove_from_cart(product: IProduct) {
            const p_index = this.get_cart.findIndex(p => p.id === product.id)
            if(!this.cart[p_index]?.quantity) this.cart.splice(p_index, 1)

            else if(p_index > -1) {
                this.cart[p_index].quantity > 1 ?
                    this.cart[p_index].quantity-- :
                    this.cart.splice(p_index, 1)
            }


            this.set_local_storage('app-cart', this.get_cart)
        },
        set_local_storage(key: string, item: any) {
            localStorage.setItem(key, JSON.stringify(item))
        },
        set_user(user: IUser) {
            this.user = user
            localStorage.setItem('app-user', JSON.stringify(user))
        },
        set_token(token: string | null) {
            this.token = token
            token && cookies.set('app-token', token, { expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000) })
        }
    }
})