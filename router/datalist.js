import express from "express";
import * as obitController from '../controller/datalist.js';
import { isAuth } from '../middlweare/auth.js';
import {textImg} from '../middlweare/datalist.js';

const router = express.Router();

//데이터 등록
router.post('/datalist', isAuth, textImg, obitController.createObituary);

//데이터 수정
router.put('/', isAuth, obitController.updateObit);

//데이터 삭제
router.delete('/', isAuth, obitController.removeObit);

//데이터 검색
router.get('/', isAuth, obitController.getByname);

//데이터 조회
router.get('/my', isAuth, obitController.getMyObituary);

//이미지 다운로드
router.get('/datalist', obitController.getTextImageData);

router.get('/:id', isAuth, obitController.getOneObituary);

export default router;