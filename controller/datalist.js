import * as obitRepository from '../data/datalist.js';
import * as obitRepositorySend from '../data/datasend.js'
import { config } from '../config.js';

export async function createObituary(req, res) { 
  const DataList = req.files;
  const {title, keyword,timestamp,sendcode,defaultcode,sensitivity} = req.body;
  const userId = req.userId;

  const dataList = await obitRepository.save({
    DataList,
    title,
    keyword,
    timestamp,
    sendcode,
    defaultcode,
    sensitivity,
    userId
  });
  res.status(201).json({"status": "201", dataList, fileInfo : req.files});
} 

////////////////////////////////////////////////////////////////////
//이미지 다운로드
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

////////////////////////////////////////////////////////////////////
// 데이터 수정
export async function updateObit(req, res, next) {
  const id = req.query.id;
  const userId = req.userId;
  const {
    title, keyword, timestamp, sendcode, defaultcode } = req.body;

  const Text ={
    SendText: req.body, 
    SendNormal: req.body,
     SendVideo: req.body};

  const Normal ={
    SendText: req.body, 
    SendNormal: req.body,
     SendVideo: req.body};

  const Video ={
    SendText: req.body, 
    SendNormal: req.body,
     SendVideo: req.body};

  // const SendText = {firstbody,secondbody,thirdbody,fourbody,fivebody};
  // const SendNormal = {firstbody,secondbody,thirdbody,fourbody,fivebody};
  // const SendVideo = {firstbody,secondbody,thirdbody,fourbody,fivebody};

  // const firstbody = {imgpath,sensitivity,dataid};
  // const secondbody = {imgpath,sensitivity,dataid};
  // const thirdbody = {imgpath,sensitivity,dataid};
  // const fourbody = {imgpath,sensitivity,dataid};
  // const fivebody = {imgpath,sensitivity,dataid} ;

  const obit = await obitRepository.findById(id);
  if(!obit) {
    return res.status(404).json({"status":"404"});
  }
  if(obit.userId !== req.userId && config.adminId !== req.userId) {
    return res.status(403).json({"status": "403"});
  }

  const updatedObit = await obitRepository.update(
    id, 
    Text,
    Normal,
    Video,
    title,
    keyword, 
    timestamp,
    sendcode,
    defaultcode,
    );
    const saveupdateObit = await obitRepositorySend.save({
      id,
      Text,
      Normal,
      Video,
      title,
      keyword, 
      timestamp,
      sendcode, 
      defaultcode,
      userId
    });
  res.status(200).json({"status": "200", updatedObit,saveupdateObit});

}

////////////////////////////////////////////////////////////////////
//데이터 삭제
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

////////////////////////////////////////////////////////////////////
//데이터 조회
export async function getMyObituary(req, res) {
  const datalist = await obitRepository.findMyObituary(req.userId);
  res.status(200).json({"status": "200", datalist});
}


export async function getOneObituary(req, res) {
  const obId = req.params.id;

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
