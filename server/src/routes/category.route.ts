import { Router } from 'express'
import { upload  } from '../middlewares/file.middleware'
import * as CategoryController from '../controllers/category.controller'

export default Router()
    .get('/', CategoryController.getAllCategories)
    .post('/', upload.single('image'), CategoryController.createCategory)
    .put('/:id', upload.single('image'), CategoryController.updateCategory)
    .delete('/:id', CategoryController.deleteCategory)