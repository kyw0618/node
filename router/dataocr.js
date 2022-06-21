import express from "express";
import * as obitController from '../controller/dataocr.js';
import { isAuth } from '../middlweare/auth.js';

const router = express.Router();

//데이터 등록
router.post('/dataocr', isAuth, obitController.createObituary);


export default router;