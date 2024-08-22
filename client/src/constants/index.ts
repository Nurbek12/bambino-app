import {
    McHome2Line,
    AkHeart,
    AkShoppingBag,
    MdOutlinedShoppingCart,
    AnOutlinedPieChart,
    ClUser03,
    ClChatCircle,
    CaCategory,
    AkShippingBox02,
    MdOutlinedReport,
    McGroup3Line,
    McShoppingBag1Line,
    TaMessageReport,
    MaWarehouse,
} from '@kalimahapps/vue-icons'
import { IProduct } from './types'

export const links = [
    { icon: McHome2Line, title: 'Главная', url: '/' },
    { icon: AkHeart, title: 'Избранные', url: '/saved' },
    { icon: MdOutlinedShoppingCart, title: 'Корзина', url: '/cart' },
    { icon: AkShoppingBag, title: 'Покупки', url: '/orders' },
]

export const admin_links = [
    { icon: AnOutlinedPieChart, title: 'Главная', url: '/admin' },
    { icon: AkShoppingBag, title: 'Покупки', url: '/admin/orders' },
    { icon: AkShippingBox02, title: 'Продукты', url: '/admin/products' },
    { icon: CaCategory, title: 'Категории', url: '/admin/categories' },
    { icon: ClChatCircle, title: 'Отзывы', url: '/admin/reviews' },
    { icon: ClUser03, title: 'Пользователи', url: '/admin/users' },
    { icon: MdOutlinedReport, title: 'Репорты Заказов', url: '/admin/reports' },
]

export const order_statuses = {
    "": "Все",
    "pending": "В ожидании",
    "finish": "Доставлено",
    "canceled": "Отменено",
}

export const order_status_items = {
    "pending": ["В ожидание", "text-blue-500"],
    "finish": ["Доставлено", "text-green-600"],
    "canceled": ["Отменено", "text-amber-600"],
}

export const report_statuses = {
    "pending": "В ожидании",
    "in progress": "В процессе",
    "resolved": "Решено"
}

export const statistic_cards = [
    { icon: McGroup3Line, title: "Пользователи", value: "users_count", color: "bg-blue-600" },
    { icon: McShoppingBag1Line, title: "Покупки", value: "orders_count", color: "bg-green-600" },
    { icon: TaMessageReport, title: "Репорты", value: "reports_count", color: "bg-red-600" },
    { icon: MaWarehouse, title: "Продукты", value: "products_count", color: "bg-yellow-400" },
]

export const product_sortings: {id: number, sort: Partial<{ [key in keyof IProduct]: 'asc' | 'desc' }>, name: string}[] = [
    { id: 0, name: 'Сначала старые', sort: { created_at: 'asc' } },
    { id: 1, name: 'Сначала новые', sort: { created_at: 'desc' } },
    { id: 2, name: 'Сначала без скидки', sort: { discount: 'asc' } },
    { id: 3, name: 'Сначала со скидкой', sort: { discount: 'desc' } },
    { id: 4, name: 'По названию (A-Z)', sort: { name: 'asc' } },
    { id: 5, name: 'По названию (Z-A)', sort: { name: 'desc' } },
    { id: 6, name: 'По цене (возрастание)', sort: { price: 'asc' } },
    { id: 7, name: 'По цене (убывание)', sort: { price: 'desc' } },
    { id: 8, name: 'По рейтингу (возрастание)', sort: { rate: 'asc' } },
    { id: 9, name: 'По рейтингу (убывание)', sort: { rate: 'desc' } },
    { id: 10, name: 'По продажам (возрастание)', sort: { sold: 'asc' } },
    { id: 11, name: 'По продажам (убывание)', sort: { sold: 'desc' } },
]

export const human_file_size = (size: number) => {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return +((size / Math.pow(1024, i)).toFixed(2)) * 1 + ' ' + ['b', 'kb', 'mb', 'gb', 'tb'][i];
}


export const statistic_data = [
    {
      "id": 1,
      "date": "01-10-23",
      "day": 1,
      "year": 2023,
      "month": 10,
      "users": 150,
      "amount": 5000.75,
      "orders": 30,
      "reports": 5,
      "created_at": "2023-10-01T10:00:00Z",
      "updated_at": "2023-10-01T12:00:00Z"
    },
    {
      "id": 2,
      "date": "02-10-23",
      "day": 2,
      "year": 2023,
      "month": 10,
      "users": 160,
      "amount": 5200.50,
      "orders": 35,
      "reports": 4,
      "created_at": "2023-10-02T10:00:00Z",
      "updated_at": "2023-10-02T12:00:00Z"
    },
    {
      "id": 3,
      "date": "03-10-23",
      "day": 3,
      "year": 2023,
      "month": 10,
      "users": 170,
      "amount": 5400.25,
      "orders": 40,
      "reports": 3,
      "created_at": "2023-10-03T10:00:00Z",
      "updated_at": "2023-10-03T12:00:00Z"
    },
    {
      "id": 4,
      "date": "04-10-23",
      "day": 4,
      "year": 2023,
      "month": 10,
      "users": 180,
      "amount": 5600.00,
      "orders": 45,
      "reports": 2,
      "created_at": "2023-10-04T10:00:00Z",
      "updated_at": "2023-10-04T12:00:00Z"
    },
    {
      "id": 5,
      "date": "05-10-23",
      "day": 5,
      "year": 2023,
      "month": 10,
      "users": 190,
      "amount": 5800.75,
      "orders": 50,
      "reports": 1,
      "created_at": "2023-10-05T10:00:00Z",
      "updated_at": "2023-10-05T12:00:00Z"
    },
    {
      "id": 6,
      "date": "06-10-23",
      "day": 6,
      "year": 2023,
      "month": 10,
      "users": 200,
      "amount": 6000.50,
      "orders": 55,
      "reports": 0,
      "created_at": "2023-10-06T10:00:00Z",
      "updated_at": "2023-10-06T12:00:00Z"
    },
    {
      "id": 7,
      "date": "07-10-23",
      "day": 7,
      "year": 2023,
      "month": 10,
      "users": 210,
      "amount": 6200.25,
      "orders": 60,
      "reports": 1,
      "created_at": "2023-10-07T10:00:00Z",
      "updated_at": "2023-10-07T12:00:00Z"
    },
    {
      "id": 8,
      "date": "08-10-23",
      "day": 8,
      "year": 2023,
      "month": 10,
      "users": 220,
      "amount": 6400.00,
      "orders": 65,
      "reports": 2,
      "created_at": "2023-10-08T10:00:00Z",
      "updated_at": "2023-10-08T12:00:00Z"
    },
    {
      "id": 9,
      "date": "09-10-23",
      "day": 9,
      "year": 2023,
      "month": 10,
      "users": 230,
      "amount": 6600.75,
      "orders": 70,
      "reports": 3,
      "created_at": "2023-10-09T10:00:00Z",
      "updated_at": "2023-10-09T12:00:00Z"
    },
    {
      "id": 10,
      "date": "10-10-23",
      "day": 10,
      "year": 2023,
      "month": 10,
      "users": 240,
      "amount": 6800.50,
      "orders": 75,
      "reports": 4,
      "created_at": "2023-10-10T10:00:00Z",
      "updated_at": "2023-10-10T12:00:00Z"
    }
]