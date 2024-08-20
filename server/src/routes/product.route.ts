import { Router } from 'express'
import { upload } from '../middlewares/file.middleware'
import * as ProductController from '../controllers/product.controller'

export default Router()
    .get('/', ProductController.getAllProducts)
    .get('/:id', ProductController.getProduct)
    .post('/', ProductController.createProduct)
    .post('/add_image/:id', upload.array('image'), ProductController.addPhotoToProduct)
    .post('/remove_image/:id', ProductController.removePhoto)
    .put('/:id', ProductController.updateProduct)
    .delete('/:id', ProductController.deleteProduct)