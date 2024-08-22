import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import * as UserController from '../controllers/user.controller'

export default Router()
    .get('/', authMiddleware, UserController.getAllUsers)
    .get('/me/:id', UserController.getMe)
    .post('/', authMiddleware, UserController.createUser)
    .put('/:id', authMiddleware, UserController.updateUser)
    .delete('/:id', authMiddleware, UserController.deleteUser)