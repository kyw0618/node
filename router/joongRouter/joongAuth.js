import express from "express";
import * as obitController from '../../controller/joongController/joongAuth.js';
import { isAuth } from '../../middlweare/auth.js';


const router = express.Router();

//회원가입
router.post('/user', isAuth, obitController.createObituary);

//회원 수정
router.put('/', isAuth, obitController.updateObit);

//회원 삭제
router.delete('/', isAuth, obitController.removeObit);

//회원 검색
router.get('/search', isAuth, obitController.getByname);

//회원 자신 조회
router.get('/my', isAuth, obitController.getMyObituary);

// 회원 검색
router.get('/:id', isAuth, obitController.getOneObituary);

export default router;