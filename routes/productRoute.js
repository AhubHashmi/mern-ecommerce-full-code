import express from 'express'
import { isAdmin, reqSignin } from '../middlewares/authMiddleware.js'
import { brainTreePaymentController, braintreeTokenController, delPhotoController, getProductController, productCategoryController, productController, productCountController, productFiltersController, productListController, productPhotoController, relatedProductController, searchProductController, singleProductController, updateProductController } from '../controllers/productController.js'
import formidable from 'express-formidable'

const router = express.Router()

router.post("/product", reqSignin, isAdmin, formidable(), productController)

//get products
router.get("/getProduct", getProductController);

//get single product
router.get("/getProduct/:slug", singleProductController);

//get photo
router.get("/productPhoto/:pid", productPhotoController);

//delete product
router.delete("/deleteProduct/:pid", delPhotoController);

//update
router.put("/updateProduct/:pid", reqSignin, isAdmin, formidable(), updateProductController);

//filter product
router.post("/productFilters", productFiltersController);

//product count
router.get("/productCount", productCountController);

//product per page
router.get("/productList/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/relatedProduct/:pid/:cid", relatedProductController);

//category wise product
router.get("/productCategory/:slug", productCategoryController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", reqSignin, brainTreePaymentController);

export default router