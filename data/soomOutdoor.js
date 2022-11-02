import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const soomOutdoor = new Mongoose.Schema( {
    title: {type: String}, 
    expirationdate_first: {type: String},
    expirationdate_second: {type: String},
    count:{type: String},
    refrigerator: {type: String},
    kind: {type: String},
    timestamp: {type: String}
  }, { 
    versionKey: false
  });

  useVirtualId(soomOutdoor);

const SoomgoOutDoor = Mongoose.model('SoomgoOutdoor', soomOutdoor);

export async function getAllObituary() {
    return SoomgoOutDoor.find().sort({ createdAt: -1});
  }
  
  export async function findById(id) {
    return SoomgoOutDoor.findById(id);
  }
  
  export async function findMyObituary(userId) {
    return SoomgoOutDoor.find({userId}).sort({ createdAt: -1});
  }
  
  export async function findObituaryByname(name) {  
    return SoomgoOutDoor.find({ $or: [{"title": name},
    {"kind":name}]}).sort({ createdAt: -1});
  }
  
  export async function save(obit) {
    return new SoomgoOutDoor(obit).save()
    .then((data) => data);
  }

  export async function update( 
    id,   
    title, 
    expirationdate_first,
    expirationdate_second,
    count,
    refrigerator,
    kind,
    timestamp
    ) {
    return SoomgoOutDoor.findByIdAndUpdate(
      id, 
      {
        title, 
        expirationdate_first,
        expirationdate_second,
        count,
        refrigerator,
        kind,
        timestamp
      }, 
      {
        returnOriginal: false}
        );
  }
  
  export async function remove(id) {
    return SoomgoOutDoor.findByIdAndDelete(id);
  }