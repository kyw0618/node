import express from "express";
import * as authController from '../controller/auth.js';
import {isAuth} from '../middlweare/auth.js';

const router = express.Router();

router.post('/', authController.singup);
router.put('/', authController.login);
router.put('/auto', authController.autoLogin);
router.get('/', isAuth, authController.getUserInfo);
router.get('/terms', authController.getAuthTerms);
router.get('/admin', isAuth, authController.adminGetUser);
router.delete('/', isAuth, authController.logout);
router.post('/sms', authController.sendsms);

export default router;