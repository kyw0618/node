import express from "express";
import * as obitController from '../controller/document.js';
import { isAuth } from '../middlweare/auth.js';

const router = express.Router();

//데이터 등록
router.post('/document', isAuth, obitController.createDocument);

//데이터 수정
router.put('/', isAuth, obitController.updateDocument);

//데이터 삭제
router.delete('/', isAuth, obitController.removeDocument);

//데이터 검색
router.get('/', isAuth, obitController.getSearchDocument);

//데이터 조회
router.get('/document/my', isAuth, obitController.getMyDocument);

export default router;