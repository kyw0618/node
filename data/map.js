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
  return MapSchema.find({ $or: [{"address_name.name": name},
      {"region_1depth_name.name": name}, 
      {"region_2depth_name": name},
      {"region_3depth_name.name":name}
    ]}).sort({ createdAt: -1});
}

export async function save(obit) {
  return new MapSchema(obit).save()
  .then((data) => data);
}

export async function update(id,
  address,
  created,
  userId
  ) {
  return MapSchema.findByIdAndUpdate(id, {      
    address,
    created,
    userId
  }, 
  {returnOriginal: false});
}

export async function remove(id) {
  return MapSchema.findByIdAndDelete(id);
}