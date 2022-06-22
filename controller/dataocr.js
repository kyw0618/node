import * as obitRepository from '../data/dataocr.js';

export async function createObituary(req, res) { 
    const {ocr} = req.body;
    const userId = req.userId;
  
    const dataocr = await obitRepository.save({
      ocr,
    userId
    });
    res.status(201).json({"status": "201",dataocr});
    console.log(req.body);

  } 