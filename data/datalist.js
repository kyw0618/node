import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const datalist = new Mongoose.Schema( {
  TextImg: {type: Array},  
  NormalImg: {type: Array},
  Video: {type: Array},
  title: {type: String},
  keyword: {type: String},
  timestamp: {type: String},
  userId: {type: String}
}, { 
  versionKey: false
});

useVirtualId(datalist);

const DataList = Mongoose.model('datalist', datalist);

export async function getAllObituary() {
  return DataList.find().sort({ createdAt: -1});
}

export async function findById(id) {
  return DataList.findById(id);
}

export async function findMyObituary(userId) {
  return DataList.find({userId}).sort({ createdAt: -1});
}

export async function findObituaryByname(name) {
  return DataList.find({ $or: [{"title": name},
      {"keyword": name}]}).sort({ createdAt: -1});
}

export async function save(obit) {
  return new DataList(obit).save()
  .then((data) => data);
}

export async function update( id, title, keyword, detail, timestamp) {
  return DataList.findByIdAndUpdate(id, {title, keyword, detail, timestamp}, {returnOriginal: false});
}

export async function remove(id) {
  return DataList.findByIdAndDelete(id);
}
