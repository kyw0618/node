import express from "express";
import * as obitController from '../../controller/joongController/joongBuRoom.js';
import { isAuth } from '../../middlweare/auth.js';


const router = express.Router();

//강의실 생성
router.post('/user', isAuth, obitController.createObituary);

//강의실 수정
router.put('/', isAuth, obitController.updateObit);

//강의실 삭제
router.delete('/', isAuth, obitController.removeObit);

//강의실 검색
router.get('/search', isAuth, obitController.getByname);

//강의실 자신 조회
router.get('/my', isAuth, obitController.getMyObituary);

//강의실 검색
router.get('/:id', isAuth, obitController.getOneObituary);

export default router;