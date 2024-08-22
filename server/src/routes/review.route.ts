import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import * as ReviewController from '../controllers/review.controller'

export default Router()
    .get('/', authMiddleware, ReviewController.getAllReviews)
    .post('/', ReviewController.createReview)
    .put('/:id', authMiddleware, ReviewController.updateReview)
    .delete('/:id', authMiddleware, ReviewController.deleteReview)