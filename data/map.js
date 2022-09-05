import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const mapSchema = new Mongoose.Schema( {
  name: {type: String},
  xvalue: {type: String},
  yvalue: {type: String},
  address:{type: String},
  call: {type: String},
  }, {
    versionKey: false
  });

  useVirtualId(mapSchema);

  const mapdb = Mongoose.model('Navermap', mapSchema, 'navermap');

export async function showMap() {
    return mapdb.findOne();
}

export async function getAllObituary() {
  return mapdb.find().sort({ createdAt: -1});
 }
  
export async function findById(id) {
  return mapdb.findById(id);
 }
  
export async function findMyObituary(userId) {
  return mapdb.find({userId}).sort({ createdAt: -1});
 }
  
export async function findObituaryByname(name) {
  return mapdb.find({ $or: [{"name": name},
      {"call": name}]}).sort({ createdAt: -1});
}
  
export async function save(obit) {
  return new mapdb(obit).save()
    .then((data) => data);
}

export async function update( 
  name,
  xvalue,
  yvalue,
  address,
  call
  ) {
  return DataList.findByIdAndUpdate(
    id, {
      name,
      xvalue,
      yvalue,
      address,
      call
    }, 
    {
      returnOriginal: false}
      );
}

export async function remove(id) {
  return DataList.findByIdAndDelete(id);
}