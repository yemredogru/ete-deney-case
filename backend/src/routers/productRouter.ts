import express from 'express';
import { AddProduct, UpdateProduct, GetProducts, DeleteProducts } from '../controllers/productController';

const productRouter = express.Router();

import { verifyToken } from '../middleware/authMiddleware';

productRouter.post('/add-product',AddProduct)
productRouter.put('/update-product',UpdateProduct)
productRouter.get('/products',GetProducts)
productRouter.delete('/delete-product',DeleteProducts)

export default productRouter;