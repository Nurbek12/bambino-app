import {
    McHome2Line,
    AkHeart,
    AkShoppingBag,
    MdOutlinedShoppingCart,
    ClUser02,
} from '@kalimahapps/vue-icons'

export const links = [
    { icon: McHome2Line, title: 'Главная', url: '/' },
    { icon: AkHeart, title: 'Избранные', url: '/saved' },
    { icon: MdOutlinedShoppingCart, title: 'Корзина', url: '/cart' },
    { icon: AkShoppingBag, title: 'Покупки', url: '/orders' },
    // { icon: ClUser02, title: 'Профил', url: '/profile' },
]

export const products: any[] = [
    {
        id: 1,
        name: "Organic Apples",
        description: "Fresh and juicy organic apples.",
        price: 2.99,
        discount: 0.1,
        count_in_stock: 100,
        rate: 4.5,
        count_of_sales: 200,
        category_id: 1,
        category: { id: 1, name: "Fruits" },
        images: [{ id: 1, url: "https://img.freepik.com/free-photo/wicker-basket-red-juicy-apples-marble-surface_114579-43684.jpg?t=st=1723567858~exp=1723571458~hmac=9ae0f5b9e2d9b0e925a2c1397820a685274c595eaa5c0b56947764d4227d5f13&w=996" }],
        reviews: [],
        created_at: "2023-01-01T00:00:00Z",
        updated_at: "2023-01-01T00:00:00Z"
    },
    {
        id: 2,
        name: "Whole Wheat Bread",
        description: "Healthy and nutritious whole wheat bread.",
        price: 3.49,
        discount: 0.05,
        count_in_stock: 50,
        rate: 4.2,
        count_of_sales: 150,
        category_id: 2,
        category: { id: 2, name: "Bakery" },
        images: [{ id: 2, url: "https://img.freepik.com/free-photo/whole-wheat-buns-table-top-view_23-2148229147.jpg?t=st=1723567971~exp=1723571571~hmac=3c713940955165f0881938b0344082d3dc3bc9e00eb42cb40d6aada15bfd0f49&w=996" }],
        reviews: [
            {
                id: 1,
                rate: 5,
                text: "Отличный продукт! Очень доволен покупкой. Рекомендую всем!",
                user_id: 1,
                user: {
                    id: 1,
                    first_name: "Иван",
                    last_name: "Иванов",
                    user_id: 1,
                    address: "Москва, ул. Ленина, д. 10",
                    phone: "+7 123 456 78 90",
                },
                created_at: "2023-01-01T00:00:00Z",
                updated_at: "2023-01-01T00:00:00Z"
            },
            {
                id: 2,
                rate: 4,
                text: "Хороший продукт, но цена могла бы быть ниже.",
                user_id: 2,
                user: {
                    id: 2,
                    first_name: "Анна",
                    last_name: "Петрова",
                    user_id: 2,
                    address: "Санкт-Петербург, ул. Пушкина, д. 20",
                    phone: "+7 987 654 32 10",
                },
                created_at: "2023-02-01T00:00:00Z",
                updated_at: "2023-02-01T00:00:00Z"
            },
            {
                id: 3,
                rate: 3,
                text: "Продукт средний, есть недостатки, но в целом удовлетворен.",
                user_id: 3,
                user: {
                    id: 3,
                    first_name: "Петр",
                    last_name: "Сидоров",
                    user_id: 3,
                    address: "Новосибирск, ул. Гагарина, д. 30",
                    phone: "+7 555 555 55 55",
                },
                created_at: "2023-03-01T00:00:00Z",
                updated_at: "2023-03-01T00:00:00Z"
            }
        ],
        created_at: "2023-01-02T00:00:00Z",
        updated_at: "2023-01-02T00:00:00Z"
    },
    {
        id: 3,
        name: "Fresh Salmon",
        description: "High-quality fresh salmon fillets.",
        price: 12.99,
        discount: 0.2,
        count_in_stock: 30,
        rate: 4.8,
        count_of_sales: 100,
        category_id: 3,
        category: { id: 3, name: "Seafood" },
        images: [{ id: 3, url: "https://img.freepik.com/free-photo/slices-fresh-salmon-slices_23-2148637878.jpg?t=st=1723568081~exp=1723571681~hmac=82e2f6c55ccdcc7b7c1766bc304ab0544d69357e14de4282beffd9124a38b521&w=360" }],
        reviews: [],
        created_at: "2023-01-03T00:00:00Z",
        updated_at: "2023-01-03T00:00:00Z"
    },
    {
        id: 4,
        name: "Organic Milk",
        description: "Pure and fresh organic milk.",
        price: 1.99,
        discount: 0.05,
        count_in_stock: 200,
        rate: 4.0,
        count_of_sales: 300,
        category_id: 4,
        category: { id: 4, name: "Dairy" },
        images: [{ id: 4, url: "https://img.freepik.com/free-photo/dairy-products-wooden-table_23-2148239870.jpg?t=st=1723568130~exp=1723571730~hmac=a0cf18635ba5fab32110ab932f356830542f66674f90fd6d5d172b8cf2b3bcf8&w=996" }],
        reviews: [],
        created_at: "2023-01-04T00:00:00Z",
        updated_at: "2023-01-04T00:00:00Z"
    },
    {
        id: 5,
        name: "Dark Chocolate",
        description: "Rich and creamy dark chocolate.",
        price: 4.99,
        discount: 0.1,
        count_in_stock: 150,
        rate: 4.7,
        count_of_sales: 250,
        category_id: 5,
        category: { id: 5, name: "Sweets" },
        images: [{ id: 5, url: "https://img.freepik.com/free-photo/close-up-view-delicious-chocolate-wooden-table_23-2148746666.jpg?t=st=1723568158~exp=1723571758~hmac=dda529bca27f6fa2b2aa40953b5a2746f2fb862047a16e18ca3afb5fbb4a011c&w=740" }],
        reviews: [],
        created_at: "2023-01-05T00:00:00Z",
        updated_at: "2023-01-05T00:00:00Z"
    },
    {
        id: 6,
        name: "Fresh Spinach",
        description: "Fresh and healthy spinach leaves.",
        price: 2.49,
        discount: 0.05,
        count_in_stock: 100,
        rate: 4.3,
        count_of_sales: 180,
        category_id: 6,
        category: { id: 6, name: "Vegetables" },
        images: [{ id: 6, url: "https://img.freepik.com/free-photo/fresh-spinach-leaves-bowl_53876-138223.jpg?t=st=1723568356~exp=1723571956~hmac=c8963a1a63a4013c4b59f3293d089a927266517927ec0986d982a37c009b3ba0&w=996" }],
        reviews: [],
        created_at: "2023-01-06T00:00:00Z",
        updated_at: "2023-01-06T00:00:00Z"
    },
    {
        id: 7,
        name: "Organic Eggs",
        description: "Fresh and organic free-range eggs.",
        price: 3.99,
        discount: 0.1,
        count_in_stock: 200,
        rate: 4.6,
        count_of_sales: 350,
        category_id: 7,
        category: { id: 7, name: "Eggs" },
        images: [{ id: 7, url: "https://img.freepik.com/free-photo/top-view-fresh-chicken-eggs_23-2148592153.jpg?t=st=1723568180~exp=1723571780~hmac=39cc60e1fd56a704c5c6acb562106333112d1328a9995fda9e89f440c43dc2d0&w=996" }],
        reviews: [],
        created_at: "2023-01-07T00:00:00Z",
        updated_at: "2023-01-07T00:00:00Z"
    },
    {
        id: 8,
        name: "Fresh Tomatoes",
        description: "Juicy and ripe fresh tomatoes.",
        price: 1.99,
        discount: 0.05,
        count_in_stock: 150,
        rate: 4.4,
        count_of_sales: 220,
        category_id: 6,
        category: { id: 6, name: "Vegetables" },
        images: [{ id: 8, url: "https://img.freepik.com/free-photo/front-view-fresh-red-tomatoes-inside-basket_140725-56902.jpg?t=st=1723568219~exp=1723571819~hmac=bf81171d1eca2d27e82079395f3ba994bf34b76b96848bba3d62391768160e0f&w=360" }],
        reviews: [],
        created_at: "2023-01-08T00:00:00Z",
        updated_at: "2023-01-08T00:00:00Z"
    },
    {
        id: 9,
        name: "Organic Honey",
        description: "Natural and pure organic honey.",
        price: 5.99,
        discount: 0.1,
        count_in_stock: 100,
        rate: 4.8,
        count_of_sales: 150,
        category_id: 8,
        category: { id: 8, name: "Honey" },
        images: [{ id: 9, url: "https://img.freepik.com/free-photo/close-up-natural-honey-dipper_23-2148346671.jpg?t=st=1723568237~exp=1723571837~hmac=b8686224e5f64f2f21bf44d725d0eaa81e448dda33849c43b1ca34c9bd66eb69&w=740" }],
        reviews: [],
        created_at: "2023-01-09T00:00:00Z",
        updated_at: "2023-01-09T00:00:00Z"
    },
    {
        id: 10,
        name: "Fresh Carrots",
        description: "Fresh and crunchy carrots.",
        price: 1.49,
        discount: 0.05,
        count_in_stock: 200,
        rate: 4.2,
        count_of_sales: 280,
        category_id: 6,
        category: { id: 6, name: "Vegetables" },
        images: [{ id: 10, url: "https://img.freepik.com/free-photo/top-view-carrots_23-2148622433.jpg?t=st=1723568257~exp=1723571857~hmac=68bd79f8596c6a43e51ad63e999fba30ef4526006b0a7e267113fc17e2fea978&w=740" }],
        reviews: [],
        created_at: "2023-01-10T00:00:00Z",
        updated_at: "2023-01-10T00:00:00Z"
    }
]

export const categories = [
    {
        id: 1,
        name: "Fruits",
        image: "https://cdn-icons-png.flaticon.com/512/1625/1625099.png"
    },
    {
        id: 2,
        name: "Bakery",
        image: "https://cdn-icons-png.flaticon.com/512/3081/3081918.png"
    },
    {
        id: 3,
        name: "Seafood",
        image: "https://cdn-icons-png.flaticon.com/512/7780/7780149.png"
    },
    {
        id: 4,
        name: "Dairy",
        image: "https://cdn-icons-png.flaticon.com/512/2674/2674505.png"
    },
    {
        id: 5,
        name: "Sweets",
        image: "https://cdn-icons-png.flaticon.com/512/2454/2454271.png"
    },
    {
        id: 6,
        name: "Vegetables",
        image: "https://cdn-icons-png.flaticon.com/512/2153/2153788.png"
    },
    {
        id: 7,
        name: "Eggs",
        image: "https://cdn-icons-png.flaticon.com/512/2713/2713472.png"
    },
    {
        id: 8,
        name: "Honey",
        image: "https://cdn-icons-png.flaticon.com/512/3413/3413290.png"
    },
    {
        id: 9,
        name: "Meat",
        image: "https://cdn-icons-png.flaticon.com/512/1046/1046820.png"
    },
    {
        id: 10,
        name: "Beverages",
        image: "https://cdn-icons-png.flaticon.com/512/1503/1503353.png"
    },
    {
        id: 11,
        name: "Snacks",
        image: "https://cdn-icons-png.flaticon.com/512/2553/2553692.png"
    },
    {
        id: 12,
        name: "Spices",
        image: "https://cdn-icons-png.flaticon.com/512/8081/8081395.png"
    },
    {
        id: 13,
        name: "Pasta",
        image: "https://cdn-icons-png.flaticon.com/512/3480/3480559.png"
    },
    {
        id: 14,
        name: "Rice",
        image: "https://cdn-icons-png.flaticon.com/512/1531/1531334.png"
    },
    {
        id: 15,
        name: "Canned Goods",
        image: "https://cdn-icons-png.flaticon.com/512/1576/1576219.png"
    },
    {
        id: 16,
        name: "Frozen Foods",
        image: "https://cdn-icons-png.flaticon.com/512/4689/4689090.png"
    },
    {
        id: 17,
        name: "Baking Goods",
        image: "https://cdn-icons-png.flaticon.com/512/14838/14838874.png"
    },
    {
        id: 18,
        name: "Condiments",
        image: "https://cdn-icons-png.flaticon.com/512/2253/2253432.png"
    },
    {
        id: 19,
        name: "Cereals",
        image: "https://cdn-icons-png.flaticon.com/512/6785/6785921.png"
    },
    {
        id: 20,
        name: "Oils",
        image: "https://cdn-icons-png.flaticon.com/512/4264/4264699.png"
    }
]

export const order_statuses = {
    "all": "Все",
    "pending": "В ожидании",
    "finish": "Доставлено",
    "canceled": "Отменено",
}