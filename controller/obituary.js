import * as obitRepository from '../data/obituary.js';
import { config } from '../config.js';


export async function createObituary(req, res) {
  const imgName = res.req.file.filename;
  const {title, keyword, detail, timestamp} = req.body;

  const userId = req.userId;
  const obituary = await obitRepository.save({
    imgName,
    title,
    keyword,
    detail,
    timestamp,
    userId
  });
  res.status(201).json({"status": "201", obituary});
}

export async function getImageData(req, res) {
  const imgName = req.query.imgname;
  let filepath;

  try {
    filepath = (`/root/Server/node/uploads/${imgName}`);
  } catch {
    return res.status(404).json({"status": "404"}); 
  }
  
  res.sendFile(filepath); 
}

// TODO 
// image update
export async function updateObit(req, res, next) {
  const id = req.params.id;
  const {
    title, keyword, detail, timestamp
  } = req.body;

  const obit = await obitRepository.findById(id);
  
  if(!obit) {
    return res.status(404).json({"status":"404"});
  }
  if(obit.userId !== req.userId && config.adminId !== req.userId) {
    return res.status(403).json({"status": "403"});
  }

   
  const updatedObit = await obitRepository.update(id, title, keyword, detail, timestamp);
  res.status(200).json({"status": "200", updatedObit});
}

export async function removeObit(req, res, next) {
  const id = req.params.id; 
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

export async function getMyObituary(req, res) {
  const obituary = await obitRepository.findMyObituary(req.userId);

  res.status(200).json({"status": "200", obituary});
}

export async function getOneObituary(req, res) {
  const obId = req.params.id;
  const obit = await obitRepository.findById(obId);

  res.status(200).json({"status": "200", obit});

}

export async function getByname(req, res) {
  const value = req.query.name;
  const result = await ( value 
    ? obitRepository.findObituaryByname(value)
    : obitRepository.getAllObituary());
  
  res.status(200).json({"status": "200", result});
}
