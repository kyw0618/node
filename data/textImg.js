import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const dataList = new Mongoose.Schema( {
  DataList: {type: Array},
  title: {type: String},
  keyword: {type: String},
  timestamp: {type: String},
  defaultcode: {type: String},
  sensitivity: {type: String},
  sendcode : {type: String},
  userId: {type: String}
}, { 
  versionKey: false
});

useVirtualId(dataList);

const DataList = Mongoose.model('DataList', dataList);

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

export async function update( id, title, keyword, detail, timestamp, defaultcode, sensitivity, sendcode) {
  return DataList.findByIdAndUpdate(id, {title, keyword, detail, timestamp, defaultcode, sensitivity, sendcode}, {returnOriginal: false});
}

export async function remove(id) {
  return DataList.findByIdAndDelete(id);
}