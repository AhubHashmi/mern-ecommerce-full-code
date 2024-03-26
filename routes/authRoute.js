import express from "express";
import {
    forgotPasswordController, loginController, regController, testController, getOrdersController,
    getAllOrdersController,
    orderStatusController,
    updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, reqSignin } from "../middlewares/authMiddleware.js";

//router obj
const router = express.Router();

//routing
//POST METHOD
router.post('/register', regController);

//LOGIN || POST
router.post('/login', loginController);

//forgot password || POST
router.post('/forgotpassword', forgotPasswordController);

//test routes
router.get('/test', reqSignin, isAdmin, testController);

//private user auth
router.get("/user-auth", reqSignin, (req, res) => {
    res.status(200).send({ ok: true });
});
//private admin auth
router.get("/admin-auth", reqSignin, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

//orders
router.get("/orders", reqSignin, getOrdersController);

//all orders
router.get("/allOrders", reqSignin, isAdmin, getAllOrdersController);

// order status update
router.put(
    "/orderStatus/:orderId",
    reqSignin,
    isAdmin,
    orderStatusController
);

//update profile
router.put("/profile", reqSignin, updateProfileController);

export default router;