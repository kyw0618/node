import express from "express";
import * as obitController from '../controller/obituary.js';
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

router.post('/create', isAuth, obitController.createObituary);
router.get('/search', isAuth, obitController.getByname);
router.get('/myobituary', isAuth, obitController.getMyObituary);
router.post('/writecondole', obitController.createCondoleMessage);
router.get('/condole', obitController.getCondoleMessage);
export default router;