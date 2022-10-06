import * as documentRepository from '../data/document.js';
import { config } from '../config.js';

export async function createDocument(req, res) { 
    const {
        doname, 
        address,
        call,
        username,
        usernumber,
        usercall,
        userreqdocument,
        imgUrl,
        inquiry_first,
        inquiry_second,
        inquiry_document,
        timestamp
        } = req.body;
    const userId = req.userId;
  
    const documentList = await documentRepository.save({
        doname, 
        address,
        call,
        username,
        usernumber,
        usercall,
        userreqdocument,
        imgUrl,
        inquiry_first,
        inquiry_second,
        inquiry_document,
        timestamp,
        userId
    });
    res.status(201).json({"status": "201", documentList});
  } 

  export async function updateDocument(req, res, next) {
    const id = req.query.id;
    const {
        doname, 
        address,
        call,
        username,
        usernumber,
        usercall,
        userreqdocument,
        imgUrl,
        inquiry_first,
        inquiry_second,
        inquiry_document,
        timestamp
     } = req.body;
  
    const obit = await documentRepository.findById(id);
    if(!obit) {
      return res.status(404).json({"status":"404"});
    }
    if(obit.userId !== req.userId && config.adminId !== req.userId) {
      return res.status(403).json({"status": "403"});
    }
  
    const updatedObit = await documentRepository.update(
      id, 
      doname, 
      address,
      call,
      username,
      usernumber,
      usercall,
      userreqdocument,
      imgUrl,
      inquiry_first,
      inquiry_second,
      inquiry_document,
      timestamp
      );  
    res.status(200).json({"status": "200", updatedObit});
  }

  export async function removeDocument(req, res, next) {
    const id = req.query.id; 
    const obit = await documentRepository.findById(id);
    if(!obit) {
      return res.status(404).json({"status":"404"});
    }
    if(obit.userId !== req.userId && config.adminId !== req.userId) {
      return res.status(403).json({"status": "403"});  
    }
  
    await documentRepository.remove(id);
    res.status(204).json(({"status":"204"}))
  }

  export async function getMyDocument(req, res) {
    const documentList = await documentRepository.findMyObituary(req.userId);
    res.status(200).json({"status": "200", documentList});
  }
  
  
  export async function getOneObituary(req, res) {
    const obId = req.query.id;
  
    const obit = await documentRepository.findById(obId);
  
    res.status(200).json({"status": "200", obit});
  
  }
  
  //데이터 검색
  export async function getSearchDocument(req, res) {
    const value = req.query.name;
    const result = await ( value 
      ? documentRepository.findObituaryByname(value)
      : documentRepository.getAllObituary());
    
    res.status(200).json({"status": "200", result});
  }