import * as centerRepository from '../data/serviceCenter.js';
import { config } from '../config.js';

export async function getAnnounceMent(req, res) {
  const id = req.query.id;
  const result = await ( id 
    ? centerRepository.finById(id)
    : centerRepository.findAll());
  if (result) {
    res.status(200).json({"status": "200", result});
  } else {
    res.status(404).json({"status": "404"});
  }
}

export async function createAnnouncement(req, res) {
  // 관리자 설정만 가능하게
  if (req.userId !== config.adminId) {
    return res.status(403).json({"status": "403"});
  }
  const {title, content, created} = req.body;

  const Announcement = await centerRepository.create(title, content, created);
  res.status(200).json({"status": "200", Announcement})
}

export async function updateAnnouncement(req, res) {
  const id = req.params.id;
  const {title, content} = req.body;

  if (req.userId !== config.adminId) {
    return res.status(403).json({"status": "403"});
  }

  const updated = await centerRepository.update(id, title, content);
  res.status(200).json({"status": "200", updated});
}

export async function removeAnnouncement(req, res) {
  const id = req.params.id;
  if (req.userId !== config.adminId) {
    return res.status(403).json({"status": "403"});
  }
  await centerRepository.remove(id);
  res.status(200).json({"status": "200"});
}