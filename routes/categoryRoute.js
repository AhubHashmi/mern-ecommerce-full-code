import express from 'express'
import { isAdmin, reqSignin } from '../middlewares/authMiddleware.js'
import { categoriesController, categoryController, delCategoryController, singlecategoryController, updateCategoryContoller } from '../controllers/categoryController.js'

const router = express.Router()

router.post('/category', reqSignin, isAdmin, categoryController)

router.put('/updateCategory/:id', reqSignin, isAdmin, updateCategoryContoller)

//get all categories
router.get('/getCategory', categoriesController)

//get single category
router.get('/singleCategory/:slug', singlecategoryController)

//delete category
router.delete('/delCategory/:id', delCategoryController)
export default router