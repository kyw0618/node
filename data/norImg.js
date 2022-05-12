import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const normalImg = new Mongoose.Schema( {
  NormalImg: {type: Array},
  title: {type: String},
  keyword: {type: String},
  detail: {type: String},
  timestamp: {type: String},
  userId: {type: String}
}, { 
  versionKey: false
});

useVirtualId(normalImg);

const NormalImg = Mongoose.model('normalImg', normalImg);

export async function getAllObituary() {
  return NormalImg.find().sort({ createdAt: -1});
}

export async function findById(id) {
  return NormalImg.findById(id);
}

export async function findMyObituary(userId) {
  return NormalImg.find({userId}).sort({ createdAt: -1});
}

export async function findObituaryByname(name) {
  return NormalImg.find({ $or: [{"title": name},
      {"keyword": name}]}).sort({ createdAt: -1});
}

export async function save(obit) {
  return new NormalImg(obit).save()
  .then((data) => data);
}

export async function update( id, title, keyword, detail, timestamp) {
  return NormalImg.findByIdAndUpdate(id, {title, keyword, detail, timestamp}, {returnOriginal: false});
}

export async function remove(id) {
  return NormalImg.findByIdAndDelete(id);
}