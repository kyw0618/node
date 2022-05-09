import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const datalist = new Mongoose.Schema( {
  textimg: {type: Object},
  title: {type: String},
  keyword: {type: String},
  detail: {type: String},
  timestamp: {type: String},
  userId: {type: String}
}, { 
  versionKey: false
});

useVirtualId(datalist);

const Datalist = Mongoose.model('datalist', datalist);

export async function getAllObituary() {
  return Datalist.find().sort({ createdAt: -1});
}

export async function findById(id) {
  return Datalist.findById(id);
}

export async function findMyObituary(userId) {
  return Datalist.find({userId}).sort({ createdAt: -1});
}

export async function findObituaryByname(name) {
  return Datalist.find({ $or: [{"title": name},
      {"keyword": name}]}).sort({ createdAt: -1});
}

export async function save(obit) {
  return new Datalist(obit).save()
  .then((data) => data);
}

export async function update( id, title, keyword, detail, timestamp) {
  return Datalist.findByIdAndUpdate(id, {title, keyword, detail, timestamp}, {returnOriginal: false});
}

export async function remove(id) {
  return Datalist.findByIdAndDelete(id);
}