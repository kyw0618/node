import express from "express";
import * as obitController from '../controller/datasend.js';
import { isAuth } from '../middlweare/auth.js';

const router = express.Router();

//판매 데이터 등록
router.post('/', isAuth, obitController.createObituary);

//판매 데이터 삭제
router.delete('/', isAuth, obitController.removeObit);

//판매 데이터 검색
router.get('/', isAuth, obitController.getByname);

//판매 데이터 조회
router.get('/my', isAuth, obitController.getMyObituary);

router.get('/:id', isAuth, obitController.getOneObituary);

router.post('/python',obitController.postPython);

export default router;