import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import * as OrderController from '../controllers/order.controller'

export default Router()
    .get('/', authMiddleware, OrderController.getAllOrders)
    .get('/id/:id', authMiddleware, OrderController.getOrder)
    .get('/my/:id', OrderController.getMyOrders)
    .get('/delivery', OrderController.getOrdersForDeliver)
    .post('/', OrderController.createOrder)
    .patch('/:id', OrderController.updateStatusOrder)
    .delete('/:id', authMiddleware, OrderController.deleteOrder)