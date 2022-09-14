import express from "express";
import * as addressController from '../controller/map.js'
import { isAuth } from '../middlweare/auth.js';

const router = express.Router();

//데이터 등록
router.post('/', isAuth, addressController.createNap);

//데이터 수정
router.put('/', isAuth, addressController.updateAddress);

//데이터 삭제
router.delete('/', isAuth, addressController.removeAddress);

//데이터 검색(동네)
router.get('/map/search', isAuth, addressController.getByname);

//데이터 검색(동네)
router.get('/map/search/hosiptal', isAuth, addressController.getHosiptal);


//데이터 조회
router.get('/my', isAuth, addressController.getMyAddress);



export default router;