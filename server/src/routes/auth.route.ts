import { Router } from 'express'
import { login } from '../controllers/auth.controller'

export default Router()
    .post('/login', login)