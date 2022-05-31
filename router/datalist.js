import express from "express";
import * as obitController from '../controller/datalist.js';
import { isAuth } from '../middlweare/auth.js';
import {textImg} from '../middlweare/textImg.js';
import {Img} from '../middlweare/normalImg.js';
import {video} from '../middlweare/video.js';


const router = express.Router();

router.post('/datalist', isAuth, textImg, Img, video, obitController.createObituary);

router.put('/:id', isAuth, obitController.updateObit);

router.delete('/:id', isAuth, obitController.removeObit);

router.get('/', isAuth, obitController.getByname);
router.get('/my', isAuth, obitController.getMyObituary);

router.get('/textImg', obitController.getTextImageData);
router.get('/normalImg', obitController.getNorImgeDate);
router.get('/video',obitController.getVideoDate);

router.get('/:id', isAuth, obitController.getOneObituary);

export default router;