import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const mapSchema = new Mongoose.Schema( {
  address: {type: Object},
  created: {type: String},
  userId: {type: String}
  }, {
    versionKey: false
});

useVirtualId(mapSchema);

const MapSchema = Mongoose.model('MapSchema', mapSchema);

export async function getAllObituary() {
  return MapSchema.find().sort({ createdAt: -1});
}

export async function findById(id) {
  return MapSchema.findById(id);
}

export async function findMyObituary(userId) {
  return MapSchema.find({userId}).sort({ createdAt: -1});
}

export async function findObituaryByname(name) {
  return MapSchema.find({ $or: [{"resident.name": name},
      {"deceased.name": name}, {"place": name}]}).sort({ createdAt: -1});
}

export async function save(obit) {
  return new MapSchema(obit).save()
  .then((data) => data);
}

export async function update(id, resident, place, deceased, eod, coffin, dofp, buried, word) {
  return MapSchema.findByIdAndUpdate(id, {resident, place, deceased, eod, coffin, dofp, buried, word}, {returnOriginal: false});
}

export async function remove(id) {
  return MapSchema.findByIdAndDelete(id);
}