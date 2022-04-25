import express from "express";
import * as datashopController from '../controller/datashop.js';


const router = express.Router();

router.post('/shop',datashopController.createObituary);


export default router;