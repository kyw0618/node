import * as createCalendar from '../data/calendar.js';
import { config } from '../config.js';

export async function createObituary(req, res) { 
    const {
        title, 
        feeling,
        timestamp,
        detail
      } = req.body;
    const userId = req.userId;
  
    const feelList = await createCalendar.save({
        title, 
        feeling,
        timestamp,
        detail,
        userId
    });
    res.status(201).json({"status": "201", feelList});
  } 

  export async function updateObit(req, res, next) {
    const id = req.query.id;
    const {
        title, 
        feeling,
        timestamp,
        detail
      } = req.body;
  
    const obit = await createCalendar.findById(id);
    if(!obit) {  
      return res.status(404).json({"status":"404"});
    }
    if(obit.userId !== req.userId && config.adminId !== req.userId) {
      return res.status(403).json({"status": "403"});
    }
  
    const updatedObit = await createCalendar.update(
      id, 
      title, 
      feeling,
      timestamp,
      detail
      );
    res.status(200).json({"status": "200", updatedObit});
  }

  export async function removeObit(req, res, next) {
    const id = req.query.id; 
    const obit = await createCalendar.findById(id);
    if(!obit) {
      return res.status(404).json({"status":"404"});
    }  
    if(obit.userId !== req.userId && config.adminId !== req.userId) {
      return res.status(403).json({"status": "403"});  
    }
  
    await createCalendar.remove(id);
    res.status(204).json(({"status":"204"}))
    
  }
  
  //////////////////////////////////////////////////////sss//////////////
  //데이터 조회
  export async function getMyObituary(req, res) {
    const calendarList = await createCalendar.findMyObituary(req.userId);  
    res.status(200).json({"status": "200", calendarList});
  }
  
  export async function getOneObituary(req, res) {
    const obId = req.query.id;
    const obit = await createCalendar.findById(obId);
  
    res.status(200).json({"status": "200", obit});
  
  }
  
  //데이터 검색
  export async function getByname(req, res) {
    const value = req.query.name;
    const result = await ( value 
      ? createCalendar.findObituaryByname(value)
      : createCalendar.getAllObituary());
    
    res.status(200).json({"status": "200", result});
    res.status(400).json({"status": "400", result});
  }