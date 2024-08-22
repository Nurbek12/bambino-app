import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import * as StatisticController from '../controllers/statistic.controller'

export default Router()
    .get('/counts', authMiddleware, StatisticController.getStatisticsCounts)