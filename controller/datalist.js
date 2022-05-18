import * as obitRepository from '../data/textImg.js';
import * as norimgRepository from '../data/norImg.js';
import * as videoRepository from '../data/video.js';
import { config } from '../config.js';

export async function createObituary(req, res) { 
  const TextImg = req.files.filepath;
  const {title, keyword,timestamp} = req.body;
  const userId = req.userId;
  
  const textImg = await obitRepository.save({
    TextImg,
    title,
    keyword,
    timestamp,
    userId
  });
  res.status(201).json({"status": "201", textImg, fileInfo : req.files.filepath});
} 

export async function createNormalImg(req, res) { 
  const NormalImg = req.files;
  const {title, keyword, detail, timestamp} = req.body;
  const userId = req.userId;
  
  const normalImg = await norimgRepository.save({
    NormalImg,
    title,
    keyword,
    detail,
    timestamp,
    userId
  });
  res.status(201).json({"status": "201", normalImg, fileInfo : req.files});
} 

export async function createVideo(req, res) { 
  const Video = req.files;
  const {title, keyword,timestamp} = req.body;
  const userId = req.userId;
  
  const video = await videoRepository.save({
    Video,
    title,
    keyword,
    timestamp,
    userId
  });
  res.status(201).json({"status": "201", video, fileInfo : req.files});
} 

////////////////////////////////////////////////////////////////////
//이미지 받아오기
export async function getTextImageData(req, res) {
  const TextImg = req.query.textimg;
  let filepath;
  try {
    filepath = (`/root/Server/node/TextUploads/${TextImg}`);
  } catch {
    return res.status(404).json({"status": "404"}); 
  }
  
  res.sendFile(filepath); 
}

export async function getNorImgeDate(req, res) {
  const NorImg = req.query.norImg;
  let filepath;
  try {
    filepath = (`/root/Server/node/uploads/${NorImg}`);
  } catch {
    return res.status(404).json({"status": "404"}); 
  }
  
  res.sendFile(filepath); 
}

export async function getVideoDate(req, res) {
  const Video = req.query.video;
  let filepath;
  try {
    filepath = (`/root/Server/node/video/${Video}`);
  } catch {
    return res.status(404).json({"status": "404"}); 
  }
  
  res.sendFile(filepath); 
}
 
////////////////////////////////////////////////////////////////////
// 데이터 수정
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

////////////////////////////////////////////////////////////////////
//데이터 삭제
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

////////////////////////////////////////////////////////////////////
//데이터 조회
export async function getMyObituary(req, res) {
  const textImg = await obitRepository.findMyObituary(req.userId);
  const normalImg = await norimgRepository.findMyObituary(req.userId);
  const video = await videoRepository.findMyObituary(req.userId);

  res.status(200).json({"status": "200", textImg,normalImg,video});
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
