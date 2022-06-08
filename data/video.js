import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const video = new Mongoose.Schema( {
  Video: {type: Array},
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

useVirtualId(video);

const Video = Mongoose.model('video', video);

export async function getAllObituary() {
  return Video.find().sort({ createdAt: -1});
}

export async function findById(id) {
  return Video.findById(id);
}

export async function findMyObituary(userId) {
  return Video.find({userId}).sort({ createdAt: -1});
}

export async function findObituaryByname(name) {
  return Video.find({ $or: [{"title": name},
      {"keyword": name}]}).sort({ createdAt: -1});
}

export async function save(obit) {
  return new Video(obit).save()
  .then((data) => data);
}

export async function update( id, title, keyword, detail, timestamp) {
  return Video.findByIdAndUpdate(id, {title, keyword, detail, timestamp}, {returnOriginal: false});
}

export async function remove(id) {
  return Video.findByIdAndDelete(id);
}