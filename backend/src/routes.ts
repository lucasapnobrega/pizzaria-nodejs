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

export { router }