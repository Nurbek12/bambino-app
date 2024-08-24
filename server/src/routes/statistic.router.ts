import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import * as StatisticController from '../controllers/statistic.controller'

export default Router()
    .get('/', authMiddleware, StatisticController.getStatistics)
    .get('/counts', authMiddleware, StatisticController.getStatisticsCounts)