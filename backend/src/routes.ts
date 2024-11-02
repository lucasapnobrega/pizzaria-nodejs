import { Router } from 'express'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { isAuthenticated } from './middlewares/isAuthenticated'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoriesController } from './controllers/category/ListCategoriesController'

const router = Router()

// user
router.post("/users", new CreateUserController().handle)
router.post("/login", new AuthUserController().handle)
router.get("/userinfo", isAuthenticated, new DetailUserController().handle)

// category
router.post("/category", isAuthenticated, new CreateCategoryController().handle)
router.get("/category", isAuthenticated, new ListCategoriesController().handle)

export { router }