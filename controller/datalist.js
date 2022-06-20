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

  const obit = await obitRepository.findById(id);
  if(!obit) {
    return res.status(404).json({"status":"404"});
  }
  if(obit.userId !== req.userId && config.adminId !== req.userId) {
    return res.status(403).json({"status": "403"});
  }

  const firstText = {
    image: req.body.firstimage,
    sensitivity: req.body.firstsensitivity,
    dataid: req.body.firstdataid
  };
  const secondText = {
    image: req.body.twoimage,
    sensitivity: req.body.twosensitivity,
    dataid: req.body.twodataid
  };
  const thirdText = {
    image: req.body.thirdimage,
    sensitivity: req.body.thirdsensitivity,
    dataid: req.body.thirddataid
  };
  const fourText = {
    image: req.body.fourimage,
    sensitivity: req.body.foursensitivity,
    dataid: req.body.fourdataid
  };
  const fiveText = {
    image: req.body.fiveimage,
    sensitivity: req.body.fivesensitivity,
    dataid: req.body.fivedataid
  };

  const updatedObit = await obitRepository.update(
    id, 
    firstText,
    secondText,
    thirdText,
    fourText,
    fiveText,
    title,
    keyword, 
    timestamp,
    sendcode,
    defaultcode,
    );
    const saveupdateObit = await obitRepositorySend.save({
      id, 
      firstText,
      secondText,
      thirdText,
      fourText,
      fiveText,
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
