import * as condoleRepository from '../data/condole.js';
import * as authRepository from '../data/auth.js';
import { config } from '../config.js';


export async function createCondoleMessage(req, res) {
  const name = await authRepository.findUserName(req.userId);
  const {
    title, content, created, obId
  } = req.body;

  const condolMessage = await condoleRepository.create(title, content, name, created, obId, req.userId);
  res.status(201).json({"status": "201", condolMessage})
}

export async function updateCondole(req, res) {
  const id = req.params.id;
  const { title, content } = req.body;
  const condole = await condoleRepository.findById(id);
  
  if(!condole) {
    return res.status(404).json({"status":"404"});
  }
  if(condole.userId !== req.userId && config.adminId !== req.userId) {
    return res.status(403).json({"status": "403"});
  }

  const updatedCondole = await condoleRepository.update(id, title, content);
  res.status(200).json(({"status":"200", updatedCondole}))
}

export async function removeCondel(req, res) {
  const id = req.params.id;
  const condole = await condoleRepository.findById(id);
  if(!condole) {
    return res.status(404).json({"status":"404"});
  }
  if(condole.userId !== req.userId && config.adminId !== req.userId) {
    return res.status(403).json({"status": "403"});
  }

  await condoleRepository.remove(id);
  res.status(200).json({"status": "200"});
}

export async function getCondoleMessage(req, res) {
  const obId = req.params.id;
  const condoleMessage = await condoleRepository.findByObId(obId);
  res.status(200).json({condoleMessage});

}