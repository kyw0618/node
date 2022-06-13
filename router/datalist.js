import express from "express";
import * as obitController from '../controller/datalist.js';
import { isAuth } from '../middlweare/auth.js';
import {textImg} from '../middlweare/datalist.js';


const router = express.Router();

router.post('/datalist', isAuth, textImg, obitController.createObituary);

router.put('/:id', isAuth, obitController.updateObit);

router.delete('/:id', isAuth, obitController.removeObit);

router.get('/', isAuth, obitController.getByname);
router.get('/my', isAuth, obitController.getMyObituary);

//이미지 다운로드
router.get('/datalist', obitController.getTextImageData);

router.get('/:id', isAuth, obitController.getOneObituary);

export default router;