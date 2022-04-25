import * as obitRepository from '../data/datalist.js';
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