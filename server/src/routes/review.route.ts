import { Router } from 'express'
import * as ReviewController from '../controllers/review.controller'

export default Router()
    .get('/', ReviewController.getAllReviews)
    .post('/', ReviewController.createReview)
    .put('/:id', ReviewController.updateReview)
    .delete('/:id', ReviewController.deleteReview)