import express from "express";
import * as appController from '../controller/map.js'
import { isAuth } from '../middlweare/auth.js';

const router = express.Router();

//데이터 등록
router.post('/', isAuth, appController.createMap);

//데이터 수정
router.put('/', isAuth, appController.updateObit);

//데이터 삭제
router.delete('/', isAuth, appController.removeObit);

//데이터 검색
router.get('/map/search', isAuth, appController.getByname);

//데이터 조회
router.get('/my', isAuth, appController.getMyObituary);


export default router;