import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const mapSchema = new Mongoose.Schema( {
  address_name: {type: String},
  region_1depth_name : {type: String},
  region_2depth_name: {type: String},
  region_3depth_name: {type: String},
  region_4depth_name: {type: String},
  call: {type: String},
  x: {type: String},
  y: {type: String},
  created: {type: String},
  imgURL: {type: String},
  userId: {type: String}
  }, {
    versionKey: false
});

useVirtualId(mapSchema);

const MapSchema = Mongoose.model('AddressMap', mapSchema);

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
  return mapSchema.find({ $or: [
    {"address_name": name},
    // {"region_1depth_name": name}, 
    // {"region_2depth_name": name},
    // {"region_3depth_name": name},
    // {"region_4depth_name": name}
    ]
  }).sort({ createdAt: -1});
}

export async function save(obit) {
  return new MapSchema(obit).save().then((data) => data);
}

export async function update(
  id,
  address_name,
  region_1depth_name,
  region_2depth_name,
  region_3depth_name,
  region_4depth_name,
  call,
  x,
  y,
  created,
  imgURL,
  userId
  ) {
  return MapSchema.findByIdAndUpdate(id, {      
    address_name,
    region_1depth_name,
    region_2depth_name,
    region_3depth_name,
    region_4depth_name,
    call,
    x,
    y,
    created,
    imgURL,
    userId
  }, 
  {returnOriginal: false});
}

export async function remove(id) {
  return MapSchema.findByIdAndDelete(id);
}