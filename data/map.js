import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const mapSchema = new Mongoose.Schema( {
  result: {type: Boolean},
  map: {type: Array},
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
  return mapdb.find({ $or: [{"title": name},
      {"keyword": name}]}).sort({ createdAt: -1});
}
  
export async function save(obit) {
  return new mapdb(obit).save()
    .then((data) => data);
}

export async function update( 
  id, 
  name,
  xvalue,
  yvalue,
  address,
  call
  ) {
  return DataList.findByIdAndUpdate(
    id, {
      id,
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