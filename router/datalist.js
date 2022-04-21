import express from "express";
import * as obitController from '../controller/datalist.js';
import { isAuth } from '../middlweare/auth.js';
import {upload} from '../middlweare/datalist.js';

const router = express.Router();

router.post('/', isAuth, upload, obitController.createObituary);
router.put('/:id', isAuth, obitController.updateObit);
router.delete('/:id', isAuth, obitController.removeObit);
router.get('/', isAuth, obitController.getByname);
router.get('/my', isAuth, obitController.getMyObituary);
router.get('/image', obitController.getImageData);
router.get('/:id', isAuth, obitController.getOneObituary);

export default router;