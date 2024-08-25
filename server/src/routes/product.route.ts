import { Router } from 'express'
import { upload } from '../middlewares/file.middleware'
import { authMiddleware } from '../middlewares/auth.middleware'
import { uploadToCloud } from '../middlewares/upload.middleware'
import * as ProductController from '../controllers/product.controller'

export default Router()
    .get('/', ProductController.getAllProducts)
    .get('/:id', ProductController.getProduct)
    .post('/', authMiddleware, ProductController.createProduct)
    .post('/add_image/:id', authMiddleware, upload.array('image'), (...d) => uploadToCloud(...d, 'files'), ProductController.addPhotoToProduct)
    .post('/remove_image/:id', authMiddleware, ProductController.removePhoto)
    .put('/:id', authMiddleware, ProductController.updateProduct)
    .delete('/:id', authMiddleware, ProductController.deleteProduct)