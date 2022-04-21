import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const obituary = new Mongoose.Schema( {
  imgName: {type: String},
  title: {type: String},
  keyword: {type: String},
  detail: {type: String},
  timestamp: {type: String},
  userId: {type: String}
}, { 
  versionKey: false
});

useVirtualId(obituary);

const Obituary = Mongoose.model('Obituary', obituary);

export async function getAllObituary() {
  return Obituary.find().sort({ createdAt: -1});
}

export async function findById(id) {
  return Obituary.findById(id);
}

export async function findMyObituary(userId) {
  return Obituary.find({userId}).sort({ createdAt: -1});
}

export async function findObituaryByname(name) {
  return Obituary.find({ $or: [{"title": name},
      {"keyword": name}]}).sort({ createdAt: -1});
}

export async function save(obit) {
  return new Obituary(obit).save()
  .then((data) => data);
}

export async function update( id, title, keyword, detail, timestamp) {
  return Obituary.findByIdAndUpdate(id, {title, keyword, detail, timestamp}, {returnOriginal: false});
}

export async function remove(id) {
  return Obituary.findByIdAndDelete(id);
}