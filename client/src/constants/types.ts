export interface IUser {
    id: number
    
    first_name: string
    last_name: string
    user_id: number
    address: string
    phone: string
  
    orders:  IOrder[]
    reviews: IReview[]
  
    created_at: string
    updated_at: string
}

export interface IProduct {
    id: number

    name: string
    description: string
    price: number
    discount: number
    count_in_stock: number
    quantity: number
    rate: number
    count_of_sales: number
  
    category_id: number
    category: ICategory
  
    images:    IImage[]
    reviews:   IReview[]
    order_items: IOrderItem[]
  
    created_at: string
    updated_at: string
}

export interface ICategory {
    id: number

    name: string
    image: string
    description: string
  
    parent: ICategory
    parent_id: number
    childrens: ICategory[]
    products: IProduct[]
  
    created_at: string
    updated_at: string
}

export interface IImage {
    id: number

    name: string
    url: string
    size: number
    product_id: number

    product: IProduct
  
    created_at: string
    updated_at: string
}

export interface IOrder {
    id: number

    status: "pending" | "finish" | "canceled"
    total: number
    user_id: number
    user: IUser
    order_items: IOrderItem[]
  
    created_at: string
    updated_at: string
}

export interface IOrderItem {
    id: number

    order_id: number
    order: IOrder
  
    product_id: number
    product: IProduct
  
    created_at: string
    updated_at: string
}

export interface IReview {
    id: number

    rate: number
    text: string
  
    user_id: number
    user: IUser
  
    product_id: number
    product: IProduct
  
    created_at: string
    updated_at: string
}