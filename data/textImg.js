import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const textImg = new Mongoose.Schema( {
  TextImg: {type: Array},
  title: {type: String},
  keyword: {type: String},
  detail: {type: String},
  timestamp: {type: String},
  userId: {type: String}
}, { 
  versionKey: false
});

useVirtualId(textImg);

const TextImg = Mongoose.model('textImg', textImg);

export async function getAllObituary() {
  return TextImg.find().sort({ createdAt: -1});
}

export async function findById(id) {
  return TextImg.findById(id);
}

export async function findMyObituary(userId) {
  return TextImg.find({userId}).sort({ createdAt: -1});
}

export async function findObituaryByname(name) {
  return TextImg.find({ $or: [{"title": name},
      {"keyword": name}]}).sort({ createdAt: -1});
}

export async function save(obit) {
  return new TextImg(obit).save()
  .then((data) => data);
}

export async function update( id, title, keyword, detail, timestamp) {
  return TextImg.findByIdAndUpdate(id, {title, keyword, detail, timestamp}, {returnOriginal: false});
}

export async function remove(id) {
  return TextImg.findByIdAndDelete(id);
}