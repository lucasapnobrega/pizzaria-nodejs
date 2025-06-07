import { Router } from 'express'

import multer from 'multer'
import uploadConfig from './config/multer'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { isAuthenticated } from './middlewares/isAuthenticated'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoriesController } from './controllers/category/ListCategoriesController'
import { CreateProductController } from './controllers/product/CreateProductController'
import { ListByCategoryController } from './controllers/product/ListByCategoryController'
import { CreateOrderController } from './controllers/order/CreateOrderController'
import { RemoveOrderController } from './controllers/order/RemoveOrderController'
import { AddListOrderController } from './controllers/order/AddListOrderController'
import { RemoveOrderItemController } from './controllers/order/RemoveOrderItemController'
import { SendOrderController } from './controllers/order/SendOrderController'
import { ListOrdersController } from './controllers/order/ListOrdersController'
import { DetailOrderController } from './controllers/order/DetailOrderController'
import { FinishOrderController } from './controllers/order/FinishOrderController'

const router = Router()

const upload = multer(uploadConfig.upload("./temp"))

// user
router.post("/users", new CreateUserController().handle)
router.post("/login", new AuthUserController().handle)
router.get("/userinfo", isAuthenticated, new DetailUserController().handle)

// category
router.post("/category", isAuthenticated, new CreateCategoryController().handle)
router.get("/category", isAuthenticated, new ListCategoriesController().handle)

// product
router.post("/product", isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.get("/product/category", isAuthenticated, new ListByCategoryController().handle)

// order
router.post("/order", isAuthenticated, new CreateOrderController().handle)
router.delete("/order", isAuthenticated, new RemoveOrderController().handle)
router.post("/order/addItem", isAuthenticated, new AddListOrderController().handle)
router.delete("/order/removeItem", isAuthenticated, new RemoveOrderItemController().handle)
router.put("/order/send", isAuthenticated, new SendOrderController().handle)
router.get("/orders", isAuthenticated, new ListOrdersController().handle)
router.get("/order/detail", isAuthenticated, new DetailOrderController().handle)
router.put("/order/finish", isAuthenticated, new FinishOrderController().handle)

export { router }