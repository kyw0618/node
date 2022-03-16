import express from "express";
import * as obitController from '../controller/obituary.js';
import { isAuth } from '../middlweare/auth.js';

const router = express.Router();

router.post('/create', isAuth, obitController.createObituary);
router.get('/search', isAuth, obitController.getByname);
router.get('/myobituary', isAuth, obitController.getMyObituary);
router.put('/:id', isAuth, obitController.updateObit);
router.delete('/:id', isAuth, obitController.removeObit);
export default router;