import express from "express";
import * as orderController from '../controller/order.js';
import { isAuth } from '../middlweare/auth.js'

const router = express.Router();

router.get('/', isAuth, orderController.searchOrder);
router.post('/', isAuth, orderController.createOrder);

export default router;