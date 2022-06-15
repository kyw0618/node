import express from "express";
import * as obitController from '../controller/datasend.js';
import { isAuth } from '../middlweare/auth.js';

const router = express.Router();

//데이터 등록
router.post('/datasend', isAuth, obitController.createObituary);

//데이터 수정
router.put('/', isAuth, obitController.updateObit);

//데이터 삭제
router.delete('/', isAuth, obitController.removeObit);

//데이터 검색
router.get('/', isAuth, obitController.getByname);

//데이터 조회
router.get('/my', isAuth, obitController.getMyObituary);

//이미지 다운로드
router.get('/datasend', obitController.getTextImageData);

router.get('/:id', isAuth, obitController.getOneObituary);

export default router;