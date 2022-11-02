import express from "express";
import * as obitController from '../controller/soomgo.js';

const router = express.Router();

//데이터 등록(냉동)
router.post('/soomPost/frozen', obitController.createObituary);

//데이터 등록(냉장)
router.post('/soomPost/refrigeration', obitController.createRefrigertaion);

//데이터 등록(실온)
router.post('/soomPost/outdoor', obitController.createOutdoor);

//데이터 수정
router.put('/soomPut', obitController.updateObit);

//데이터 삭제
router.delete('/soomDelete', obitController.removeObit);

//데이터 검색
router.get('/soomSearch', obitController.getByname);

//데이터 조회
router.get('/soomMy', obitController.getMyObituary);


export default router;