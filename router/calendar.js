import express from "express";
import * as obitController from '../controller/calendar.js';
import { isAuth } from '../middlweare/auth.js';


const router = express.Router();

//데이터 등록
router.post('/feel', isAuth, obitController.createObituary);

//데이터 수정
router.put('/', isAuth, obitController.updateObit);

//데이터 삭제
router.delete('/', isAuth, obitController.removeObit);

//데이터 검색
router.get('/search', isAuth, obitController.getByname);

//데이터 조회
router.get('/my', isAuth, obitController.getMyObituary);

router.get('/:id', isAuth, obitController.getOneObituary);

export default router;