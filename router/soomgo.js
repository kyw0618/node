import express from "express";
import * as obitController from '../controller/soomgo.js';

const router = express.Router();

//데이터 등록(냉동)
router.post('/soomPost/frozen', obitController.createObituary);

//데이터 조회(냉동)
router.get('/soomMy/frozen', obitController.getMyObituary);

//데이터 수정(냉동)
router.put('/soomPut/frozen', obitController.updateObit);

//데이터 삭제(냉동)
router.delete('/soomDelete/frozen', obitController.removeObit);

////////////////////////////////////////////////////////////

//데이터 등록(냉장)
router.post('/soomPost/refrigeration', obitController.createRefrigertaion);

//데이터 조회(냉장)
router.get('/soomMy/refrigeration', obitController.getMyRefrigertaion);

//데이터 수정(냉장)
router.put('/soomPut/refrigeration', obitController.updateRefrigertaion);

//데이터 삭제(냉장)
router.delete('/soomDelete/refrigeration', obitController.removeRefrigertaion);

///////////////////////////////////////////////////////////////

//데이터 등록(실온)
router.post('/soomPost/outdoor', obitController.createOutdoor);

//데이터 조회(실온)
router.get('/soomMy/outdoor', obitController.getMyOutdoor);

//데이터 수정(실온)
router.put('/soomPut/outdoor', obitController.updateOutdoor);

//데이터 삭제(실온)
router.delete('/soomDelete/outdoor', obitController.removeOutdoor);


export default router;