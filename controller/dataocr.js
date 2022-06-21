import * as obitRepository from '../data/dataocr.js';

export async function createObituary(req, res) { 
    const {version,requestId,timestamp, images} = req.body;
    const userId = req.userId;
  
    const dataocr = await obitRepository.save({
    version,
    requestId,
    timestamp, 
    images,
    userId
    });
    res.status(201).json({"status": "201", dataocr, fileInfo : req.files});
  } 