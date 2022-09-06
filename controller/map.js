import * as obitRepository from '../data/map.js';


export async function mapfun(req, res) {
    const mapData = await naverMap.showMap();
    res.status(200).json(mapData);
  }

  export async function createMap(req, res) { 
    const {result,map} = req.body;
  
    const naverMap = await obitRepository.save({
      result,
      map
    });
    res.status(201).json({"status": "201", naverMap});
  } 

  export async function updateObit(req, res, next) {
    const id = req.query.id;
    const {name,xvalue,yvalue,address,call } = req.body;
  
    const obit = await obitRepository.findById(id);
    if(!obit) {
      return res.status(404).json({"status":"404"});
    }
    if(obit.userId !== req.userId && config.adminId !== req.userId) {
      return res.status(403).json({"status": "403"});
    }
  
    const updatedObit = await obitRepository.update(
      name,
      xvalue,
      yvalue,
      address,
      call
      );
    res.status(200).json({"status": "200", updatedObit});
  }

  export async function removeObit(req, res, next) {
    const id = req.query.id; 
    const obit = await obitRepository.findById(id);
    if(!obit) {
      return res.status(404).json({"status":"404"});
    }
    if(obit.userId !== req.userId && config.adminId !== req.userId) {
      return res.status(403).json({"status": "403"});  
    }
  
    await obitRepository.remove(id);
    res.status(204).json(({"status":"204"}))
}

//데이터 조회
export async function getMyObituary(req, res) {
    const naverMap = await obitRepository.findMyObituary(req.userId);
    res.status(200).json({"status": "200", naverMap});
  }
  
  
  export async function getOneObituary(req, res) {
    const obId = req.query.id;
  
    const obit = await obitRepository.findById(obId);
  
    res.status(200).json({"status": "200", obit});
  
  }
  
  //데이터 검색
  export async function getByname(req, res) {
    const value = req.query.name;
    const result = await ( value 
      ? obitRepository.findObituaryByname(value)
      : obitRepository.getAllObituary());
    
    res.status(200).json({"status": "200", result});
  }