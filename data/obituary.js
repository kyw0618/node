import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const obituary = new Mongoose.Schema( {
  imgName: {type: String},
  resident: {type: Object},
  place: {type: String},
  deceased: {type: Object},
  eod: {type: String},
  coffin: {type: String},
  dofp: {type: String},
  buried: {type: String},
  word: {type: String},
  created: {type: String},
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
  return Obituary.find({ $or: [{"resident.name": name},
      {"deceased.name": name}, {"place": name}]}).sort({ createdAt: -1});
}

export async function save(obit) {
  return new Obituary(obit).save()
  .then((data) => data);
}

export async function update( id, resident, place, deceased, eod, coffin, dofp, buried, word) {
  return Obituary.findByIdAndUpdate(id, {resident, place, deceased, eod, coffin, dofp, buried, word}, {returnOriginal: false});
}

export async function remove(id) {
  return Obituary.findByIdAndDelete(id);
}