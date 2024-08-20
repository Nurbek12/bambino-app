import { Router } from 'express'
import * as OrderController from '../controllers/order.controller'

export default Router()
    .get('/', OrderController.getAllOrders)
    .get('/id/:id', OrderController.getOrder)
    .get('/my/:id', OrderController.getMyOrders)
    .get('/delivery', OrderController.getOrdersForDeliver)
    .post('/', OrderController.createOrder)
    .patch('/:id', OrderController.updateStatusOrder)
    .delete('/:id', OrderController.deleteOrder)