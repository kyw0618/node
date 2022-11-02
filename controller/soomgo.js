import * as soomgoData from '../data/soomgo.js';
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