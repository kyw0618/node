import * as authRepository from '../../data/joongData/joongAuth.js';
import jwt from 'jsonwebtoken';
import { config } from '../../config.js';
import { findAuthTerms} from '../../data/app.js';
import CryptoJS from 'crypto-js';
import request from 'request';

export async function createObituary(req, res) { 
    const {
        email, 
        password,
        schoolnumber,
        schoolcollage,
        name,
        phone,
        birth,
        sex,
        terms
      } = req.body;
    const userId = req.userId;
  
    const joongbuAuth = await authRepository.save({
        email, 
        password,
        schoolnumber,
        schoolcollage,
        name,
        phone,
        birth,
        sex,
        terms
    });
    res.status(201).json({"status": "201", joongbuAuth});
  } 

  export async function updateObit(req, res, next) {
    const id = req.query.id;
    const {
        email, 
        password,
        schoolnumber,
        schoolcollage,
        name,
        phone,
        birth,
        sex,
        terms
      } = req.body;
  
    const obit = await authRepository.findById(id);
    if(!obit) {  
      return res.status(404).json({"status":"404"});
    }
    if(obit.userId !== req.userId && config.adminId !== req.userId) {
      return res.status(403).json({"status": "403"});
    }
  
    const updatedObit = await authRepository.update(
      id, 
      email, 
      password,
      schoolnumber,
      schoolcollage,
      name,
      phone,
      birth,
      sex,
      terms
      );
    res.status(200).json({"status": "200", updatedObit});
  }

  export async function removeObit(req, res, next) {
    const id = req.query.id; 
    const obit = await authRepository.findById(id);
    if(!obit) {
      return res.status(404).json({"status":"404"});
    }  
    if(obit.userId !== req.userId && config.adminId !== req.userId) {
      return res.status(403).json({"status": "403"});  
    }
  
    await authRepository.remove(id);
    res.status(204).json(({"status":"204"}))
    
  }

  export async function getMyObituary(req, res) {
    const calendarList = await authRepository.findMyObituary(req.userId);  
    res.status(200).json({"status": "200", calendarList});
  }
  
  export async function getOneObituary(req, res) {
    const obId = req.query.id;
    const obit = await authRepository.findById(obId);
  
    res.status(200).json({"status": "200", obit});
  
  }
  
  //데이터 검색
  export async function getByname(req, res) {
    const value = req.query.name;
    const result = await ( value 
      ? authRepository.findObituaryByname(value)
      : authRepository.getAllObituary());
    
    res.status(200).json({"status": "200", result});
    res.status(400).json({"status": "400", result});
  }