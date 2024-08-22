import { Router } from 'express'
import authRoute from './auth.route'
import userRoute from './user.route'
import orderRoute from './order.route'
import reportRoute from './report.route'
import reviewRoute from './review.route'
import productRoute from './product.route'
import categoryRoute from './category.route'
import statisticRouter from './statistic.router'

export default Router()
    .use('/auth', authRoute)
    .use('/users', userRoute)
    .use('/orders', orderRoute)
    .use('/reports', reportRoute)
    .use('/reviews', reviewRoute)
    .use('/products', productRoute)
    .use('/categories', categoryRoute)
    .use('/statistics', statisticRouter)