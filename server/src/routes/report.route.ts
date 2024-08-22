import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import * as ReportController from '../controllers/report.controller'

export default Router()
    .get('/', authMiddleware, ReportController.getAllReports)
    .post('/', ReportController.createReport)
    .put('/:id', authMiddleware, ReportController.updateReport)
    .delete('/:id', authMiddleware, ReportController.deleteReport)