import { Router } from 'express'
import { upload } from '../middlewares/file.middleware'
import { authMiddleware } from '../middlewares/auth.middleware'
import { uploadToCloud } from '../middlewares/upload.middleware'
import * as CategoryController from '../controllers/category.controller'

export default Router()
    .get('/', CategoryController.getAllCategories)
    .post('/', authMiddleware, upload.single('image'), (...d) => uploadToCloud(...d, 'file'), CategoryController.createCategory)
    .put('/:id', authMiddleware, upload.single('image'), (...d) => uploadToCloud(...d, 'file'), CategoryController.updateCategory)
    .delete('/:id', authMiddleware, CategoryController.deleteCategory)