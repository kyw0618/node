import * as obitRepository from '../data/obituary.js';
import { config } from '../config.js';

export async function createObituary(req, res) {
  const {
    title,group,keyword,photo,video,detail,timestamp, created
  } = req.body;

  const obituary = await obitRepository.create(
    title,group,keyword,photo,video,detail,timestamp, req.userId, created);
  res.status(201).json({"status": "201", obituary});
}

export async function updateObit(req, res, next) {
  const id = req.params.id;
  const {
    title,group,keyword,photo,video,detail,timestamp
  } = req.body;

  const obit = await obitRepository.getAllById(id);
  
  if(!obit) {
    return res.status(404).json({"status":"404"});
  }
  if(obit.userId !== req.userId && config.adminId !== req.userId) {
    return res.status(403).json({"status": "403"});
  }

  const updatedObit = await obitRepository.update(id, title,group,keyword,photo,video,detail,timestamp);
  res.status(200).json({"status": "200", updatedObit});
}

export async function removeObit(req, res, next) {
  const id = req.params.id;
  const obit = await obitRepository.getAllById(id);
  if(!obit) {
    return res.status(404).json({"status":"404"});
  }
  if(obit.userId !== req.userId && config.adminId !== req.userId) {
    return res.status(403).json({"status": "403"});
  }

  await obitRepository.remove(id);
  res.status(200).json(({"status":"200"}))
}

export async function getMyObituary(req, res) {
  const obituary = await obitRepository.findMyObituary(req.userId);
  if (!obituary) {
    res.status(404).json({"status": "404"});
  }

  res.status(200).json({"status": "200", obituary});
}

export async function getByname(req, res) {
  const value = req.query.name;
  const result = await ( value 
    ? obitRepository.findObituaryByname(value)
    : obitRepository.getAllObituary());
  if(result) {
    res.status(200).json(result);
  } else {
    res.status(404);
  }
}

export async function getObituary(req, res) {
  const allObit = await obitRepository.getAll();
  res.status(200).json(allObit);
}

//https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
