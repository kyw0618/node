import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const mapSchema = new Mongoose.Schema( {
  address_name: {type: String},
  place_name: {type: String},
  road_address_name: {type: String},
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

export async function findAddressByname(name) {
  return MapSchema.find({ $or: [
    {'address_name' : {$regex: name}},
    {'place_name' : {$regex: name}}
  ]
  })
}

export async function save(obit) {
  return new MapSchema(obit).save().then((data) => data);
}

export async function update(
  id,
  address_name,
  place_name,
  road_address_name,
  call,
  x,
  y,
  created,
  imgURL,
  userId
  ) {
  return MapSchema.findByIdAndUpdate(id, {      
    address_name,
    place_name,
    road_address_name,
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