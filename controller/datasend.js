import * as obitRepository from '../data/datasend.js';
import { config } from '../config.js';
import { request } from 'express';

export async function createObituary(req, res) { 
    const {title, keyword,timestamp,defaultcode,
      sensitivity,sendcode,dataid} = req.body;
    const userId = req.userId;
    try {
    var datasend = await obitRepository.save({
      title,
      keyword,
      timestamp,
      defaultcode,
      sensitivity,
      sendcode,
      dataid,
      userId
    });
  } catch (error) {
    return res.status(400).json({"status" : "400"});
  }
    res.status(201).json({"status": "201", datasend});
  } 


  ////////////////////////////////////////////////////////////////////
  //판매 데이터 삭제
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
  //판매 데이터 조회
  export async function getMyObituary(req, res) {
    const datalist = await obitRepository.findMyObituary(req.userId);
    res.status(200).json({"status": "200", datalist});
  }
  
  
  export async function getOneObituary(req, res) {
    const obId = req.params.id;
  
    const obit = await obitRepository.findById(obId);
  
    res.status(200).json({"status": "200", obit});
  
  }
  
  //판매 데이터 검색
  export async function getByname(req, res) {
    const value = req.query.name;
    const result = await ( value 
      ? obitRepository.findObituaryByname(value)
      : obitRepository.getAllObituary());
    
    res.status(200).json({"status": "200", result});
  }

  export async function sendOCR (req,res) {
    // const {version, requestId, timestamp, lang} = req.body;
    // const images = {
    //   format: req.body.format,
    //   name: req.body.name,
    //   url: req.body.url
    // };
    // const userId = req.userId;
    // try {
    //   var naverOCR = await obitRepository.save({
    //     version, 
    //     requestId, 
    //     timestamp, 
    //     lang,
    //     images,
    //     userId
    //   });
    // } catch (error) {
    //   return res.status(400).json({"status" : "400"});
    // }
    
    // res.status(201).json({"status": "201", naverOCR});
    const imageurl = req.query.ocrImg;
    send_ocr(imageurl);
    res.status(201).json({"status": "201"});
  }

  function send_ocr(imageUrl) {
    var OcrImg = imageUrl
    var user_image_url = (`/root/Server/node/TextUploads/${OcrImg}`);
    var resultCode = 404;
    const method = "POST";
    const space = " ";
    const newLine = "\n";
    const url = config.ocr.ocrurl;
    request( {
      method: method,
      json: true,
      uri: url,
      body: {
        version: "V2",
        requestId: "string",
        timestamp: "string",
        lang: "ko",
        images: [{
          format: "png",
          name: "test 1",
          url: user_image_url
        }]
      },
    },
    function (err, res, html) {
      if (err) console.log(err);
      else { resultCode = 200; console.log(html); }
    }
    );
    return resultCode;
  }
  