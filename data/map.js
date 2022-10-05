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
  webSite:{type: String},
  weekend_time:{type: Array},
  detail_words:{type: String},
  userId: {type: String}
    // imgURL_first: {type: String},
  // imgURL_second: {type: String},
  // imgURL_third: {type: String},
  // imgURL_four: {type: String},
  // imgURL_five: {type: String},
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
  ]
  })
}

export async function findHosiptalByname(name) {
  return MapSchema.find({ $or: [
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
  // imgURL_first,
  // imgURL_second,
  // imgURL_third,
  // imgURL_four,
  // imgURL_five,
  imgURL,
  webSite,
  weekend_time,
  detail_words,
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
    // imgURL_first,
    // imgURL_second,
    // imgURL_third,
    // imgURL_four,
    // imgURL_five,
    imgURL,
    webSite,
    weekend_time,
    detail_words,
    userId
  }, 
  {returnOriginal: false});
}

export async function remove(id) {
  return MapSchema.findByIdAndDelete(id);
}