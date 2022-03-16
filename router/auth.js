import express from "express";
import * as authController from '../controller/auth.js';

const router = express.Router();

// sign up
// const validateCredential = [
//   body('name').trim().notEmpty().withMessage('name should not be Empty'),
//   body('password').trim().notEmpty().withMessage('password should not be Empty')
// ]

router.post('/signup', authController.singup);
router.put('/login', authController.login);
router.put('/autologin', authController.autoLogin);
router.post('/sms', authController.sendsms);
router.put('/logout', authController.logout);
router.get('/getterms', authController.getAuthTerms);

export default router;