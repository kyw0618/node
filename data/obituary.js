import Mongoose from 'mongoose';
import * as userRepository from './auth.js';

const obituary = new Mongoose.Schema( {
  medicallist: {type: Object},
  userid: {type: String}
}, { 
  versionKey: false
});

const condoleMessage = new Mongoose.Schema( {
  title: {type: String},
  content: {type: String},
  name: {type: String},
  obId: {type: String}
}, { 
  versionKey: false
});

const Obituary = Mongoose.model('Obituary', obituary);
const CondoleMessage = Mongoose.model('CondoleMessage', condoleMessage);

export async function getAllObituary() {
  return Obituary.find().sort({ createdAt: -1});
}

export async function findMyObituary(userId) {
  return Obituary.find({"userid": userId}).sort({ createdAt: -1});
}
export async function findObituaryByname(name) {
  return Obituary.find({ $or: [{"resident.name": name},
      {"deceased.name": name}, {"place.place_name": name}]}).sort({ createdAt: -1});
}

export async function create( medicallist, userId) {
  return new Obituary({ medicallist, userid: userId}).save()
  .then((data) => data);
}

export async function writeCondoleMessage(title, content, name, obId) {
  return new CondoleMessage({title, content, name, obId}).save();
}

export async function findCondoleMessage(obId) {
  return CondoleMessage.find({"obId" : obId}).sort({createdAt: -1});
}