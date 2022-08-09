import express from "express";
import * as authController from '../controller/auth.js';
import {isAuth} from '../middlweare/auth.js';
import { body, param, validationResult, query } from 'express-validator';
import { validate } from '../middlweare/validator.js'
import { profileupload } from '../middlweare/profile.js';


const router = express.Router();
   
const validateSms= [
    body('phone').trim().notEmpty(),
    validate,
  ];
  
  const validateCredential = [
    body('phone').trim().notEmpty(),
    body('smsnumber').trim().notEmpty(),
    validate,
  ];
  
  const validateSignup = [
    ... validateCredential,
    body('phone').trim().notEmpty(),
    body('sex').trim().notEmpty(),  
    body('name').trim().notEmpty(),
    validate,
  ];

  router.post('/', profileupload, authController.singup);
  router.put('/', validateCredential, authController.login);
  router.put('/auto', authController.autoLogin);

  //회원정보 수정
  router.put('/putUser',isAuth,authController.updateUser);

  router.get('/', isAuth, authController.getUserInfo);
  router.get('/terms', authController.getAuthTerms);
  router.get('/admin', isAuth, authController.adminGetUser);
  router.get('/image', isAuth, authController.getProfileData);

  router.delete('/', isAuth, authController.logout);
  router.post('/sms', validateSms, authController.sendsms);

export default router;