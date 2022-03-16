import Mongoose from 'mongoose';
import * as userRepository from './auth.js';

const obituary = new Mongoose.Schema( {
  title: {type: Object},
  photo: {type: Object},
  video: {type: Object},
  detail: {type: Object},
  rating: {type: Object},
  timestamp: {type: Object},
  userid: {type: String}
}, { 
  versionKey: false
});

const Obituary = Mongoose.model('Obituary', obituary);

export async function getAllObituary() {
  return Obituary.find().sort({ createdAt: -1});
}

export async function getAllById(id) {
  return Obituary.findById(id);
}

export async function findMyObituary(userId) {
  return Obituary.find({"userid": userId}).sort({ createdAt: -1});
}
export async function findObituaryByname(name) {
  return Obituary.find({ $or: [{"resident.name": name},
      {"deceased.name": name}, {"place.place_name": name}]}).sort({ createdAt: -1});
}

export async function create( title,photo,video,detail,rating,timestamp, userId) {
  return new Obituary({ title,photo,video,detail,rating,timestamp, userid: userId}).save()
  .then((data) => data);
}

export async function update( id, resident, place, deceased, eod, coffin, dofp, buried, word) {
  return Obituary.findByIdAndUpdate(id, {resident, place, deceased, eod, coffin, dofp, buried, word}, {returnOriginal: false});
}

export async function remove(id) {
  return Obituary.findByIdAndDelete(id);
}