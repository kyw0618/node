import express from "express";
import * as appController from '../controller/map.js'
import { isAuth } from '../middlweare/auth.js';

const router = express.Router();

router.get('/map', isAuth, appController.mapfun);

export default router;