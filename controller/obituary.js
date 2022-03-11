import * as obitRepository from '../data/obituary.js';

export async function createObituary(req, res) {
  const {
    medicallist
  } = req.body;

  const obituary = await obitRepository.create(
    medicallist, req.userId);
  res.status(201).json(obituary);
}

export async function createCondoleMessage(req, res) {
  const {
    title, content, name, obId
  } = req.body;

  const condolMessage = await obitRepository.writeCondoleMessage(title, content, name, obId);
  res.status(201).json(condolMessage)
}
export async function getMyObituary(req, res) {
  const obituary = await obitRepository.findMyObituary(req.userId);
  if (!obituary) {
    res.status(404).json({massage: "Not Found"});
  }

  res.status(200).json({obituary});
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

export async function getCondoleMessage(req, res) {
  const obId = req.query.obid;
  const condoleMessage = await obitRepository.findCondoleMessage(obId);
  res.status(200).json({condoleMessage});

}
//https://www.geeksforgeeks.org/upload-and-retrieve-image-on-mongodb-using-mongoose/
