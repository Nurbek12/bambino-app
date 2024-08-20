import { Router } from 'express'
import * as UserController from '../controllers/user.controller'

export default Router()
    .get('/', UserController.getAllUsers)
    .get('/me/:id', UserController.getMe)
    .post('/', UserController.createUser)
    .put('/:id', UserController.updateUser)
    .delete('/:id', UserController.deleteUser)