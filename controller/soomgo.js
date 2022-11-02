import * as soomgoData from '../data/soomgo.js';
import * as soomRe from '../data/soomRefrigertaion.js';
import * as soomOut from '../data/soomOutdoor.js';
import { config } from '../config.js';

export async function createObituary(req, res) { 
    const {
        title, 
        expirationdate_first,
        expirationdate_second,
        count,
        refrigerator,
        kind,
        timestamp
      } = req.body;
    const userId = req.userId;
  
    const soomgo = await soomgoData.save({
        title, 
        expirationdate_first,
        expirationdate_second,
        count,
        refrigerator,
        kind,
        timestamp,
        userId
    });
    res.status(201).json({"status": "201", soomgo});
  } 

  ///////////////////////////////////////////////////

  export async function updateObit(req, res, next) {
    const id = req.query.id;
    const {
        title, 
        expirationdate_first,
        expirationdate_second,
        count,
        refrigerator,
        kind,
        timestamp
      } = req.body;
  
    const obit = await soomgoData.findById(id);
    if(!obit) {  
      return res.status(404).json({"status":"404"});
    }
    if(obit.userId !== req.userId && config.adminId !== req.userId) {
      return res.status(403).json({"status": "403"});
    }
  
    const updatedObit = await soomgoData.update(
      id, 
      title, 
      expirationdate_first,
      expirationdate_second,
      count,
      refrigerator,
      kind,
      timestamp
      );
    res.status(200).json({"status": "200", updatedObit});
  }

  //////////////////////////////////////////////

  export async function removeObit(req, res, next) {
    const id = req.query.id; 
    const obit = await soomgoData.findById(id);
    if(!obit) {
      return res.status(404).json({"status":"404"});
    }  
    if(obit.userId !== req.userId && config.adminId !== req.userId) {
      return res.status(403).json({"status": "403"});  
    }
  
    await soomgoData.remove(id);
    res.status(204).json(({"status":"204"}))
    
  }

    //////////////////////////////////////////////////////sss//////////////
  //데이터 조회
  export async function getMyObituary(req, res) {
    const soomgoList = await soomgoData.findMyObituary(req.userId);  
    res.status(200).json({"status": "200", soomgoList});
  }
  
  
  export async function getOneObituary(req, res) {
    const obId = req.query.id;
    const obit = await soomgoData.findById(obId);
  
    res.status(200).json({"status": "200", obit});
  
  }
  
  //데이터 검색
  export async function getByname(req, res) {
    const value = req.query.name;
    const result = await ( value 
      ? soomgoData.findObituaryByname(value)
      : soomgoData.getAllObituary());
    
   res.status(200).json({"status": "200", result});
   res.status(400).json({"status": "400", result});
  
  }


  ////////////////////////////////////////////////////////////////////////
  //냉장

  export async function createRefrigertaion(req, res) { 
    const {
        title, 
        expirationdate_first,
        expirationdate_second,
        count,
        refrigerator,
        kind,
        timestamp
      } = req.body;
    const userId = req.userId;
  
    const soomgo = await soomRe.save({
        title, 
        expirationdate_first,
        expirationdate_second,
        count,
        refrigerator,
        kind,
        timestamp,
        userId
    });
    res.status(201).json({"status": "201", soomgo});
  } 


  //데이터 수정
  export async function updateRefrigertaion(req, res, next) {
    const id = req.query.id;
    const {
        title, 
        expirationdate_first,
        expirationdate_second,
        count,
        refrigerator,
        kind,
        timestamp
      } = req.body;
  
    const obit = await soomRe.findById(id);
    if(!obit) {  
      return res.status(404).json({"status":"404"});
    }
    if(obit.userId !== req.userId && config.adminId !== req.userId) {
      return res.status(403).json({"status": "403"});
    }
  
    const updatedObit = await soomRe.update(
      id, 
      title, 
      expirationdate_first,
      expirationdate_second,
      count,
      refrigerator,
      kind,
      timestamp
      );
    res.status(200).json({"status": "200", updatedObit});
  }


  //데이터 삭제
  export async function removeRefrigertaion(req, res, next) {
    const id = req.query.id; 
    const obit = await soomRe.findById(id);
    if(!obit) {
      return res.status(404).json({"status":"404"});
    }  
    if(obit.userId !== req.userId && config.adminId !== req.userId) {
      return res.status(403).json({"status": "403"});  
    }
  
    await soomRe.remove(id);
    res.status(204).json(({"status":"204"}))
    
  }

  //데이터 조회
  export async function getMyRefrigertaion(req, res) {
    const soomgoList = await soomRe.findMyObituary(req.userId);  
    res.status(200).json({"status": "200", soomgoList});
  }
  
  
  export async function getOneRefrigertaion(req, res) {
    const obId = req.query.id;
    const obit = await soomRe.findById(obId);
  
    res.status(200).json({"status": "200", obit});
  
  }
  
  //데이터 검색
  export async function getBynameRefrigertaion(req, res) {
    const value = req.query.name;
    const result = await ( value 
      ? soomRe.findObituaryByname(value)
      : soomRe.getAllObituary());
    
   res.status(200).json({"status": "200", result});
   res.status(400).json({"status": "400", result});
  
  }


  ///////////////////////////////////////////////////////

  //실온

  export async function createOutdoor(req, res) { 
    const {
        title, 
        expirationdate_first,
        expirationdate_second,
        count,
        refrigerator,
        kind,
        timestamp
      } = req.body;
    const userId = req.userId;
  
    const soomgo = await soomOut.save({
        title, 
        expirationdate_first,
        expirationdate_second,
        count,
        refrigerator,
        kind,
        timestamp,
        userId
    });
    res.status(201).json({"status": "201", soomgo});
  } 

  export async function updateOutdoor(req, res, next) {
    const id = req.query.id;
    const {
        title, 
        expirationdate_first,
        expirationdate_second,
        count,
        refrigerator,
        kind,
        timestamp
      } = req.body;
  
    const obit = await soomOut.findById(id);
    if(!obit) {  
      return res.status(404).json({"status":"404"});
    }
    if(obit.userId !== req.userId && config.adminId !== req.userId) {
      return res.status(403).json({"status": "403"});
    }
  
    const updatedObit = await soomOut.update(
      id, 
      title, 
      expirationdate_first,
      expirationdate_second,
      count,
      refrigerator,
      kind,
      timestamp
      );
    res.status(200).json({"status": "200", updatedObit});
  }

  //////////////////////////////////////////////

  export async function removeOutdoor(req, res, next) {
    const id = req.query.id; 
    const obit = await soomOut.findById(id);
    if(!obit) {
      return res.status(404).json({"status":"404"});
    }  
    if(obit.userId !== req.userId && config.adminId !== req.userId) {
      return res.status(403).json({"status": "403"});  
    }
  
    await soomOut.remove(id);
    res.status(204).json(({"status":"204"}))
    
  }

    //////////////////////////////////////////////////////sss//////////////
  //데이터 조회
  export async function getMyOutdoor(req, res) {
    const soomgoList = await soomOut.findMyObituary(req.userId);  
    res.status(200).json({"status": "200", soomgoList});
  }
  
  
  export async function getOneOutdoor(req, res) {
    const obId = req.query.id;
    const obit = await soomOut.findById(obId);
  
    res.status(200).json({"status": "200", obit});
  
  }
  
  //데이터 검색
  export async function getOutdoor(req, res) {
    const value = req.query.name;
    const result = await ( value 
      ? soomOut.findObituaryByname(value)
      : soomOut.getAllObituary());
    
   res.status(200).json({"status": "200", result});
   res.status(400).json({"status": "400", result});
  
  }
