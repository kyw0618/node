import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const soomgoRe = new Mongoose.Schema( {
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

  useVirtualId(soomgoRe);

const SoomgoRe = Mongoose.model('SoomgoRe', soomgoRe);

export async function getAllObituary() {
    return SoomgoRe.find().sort({ createdAt: -1});
  }
  
  export async function findById(id) {
    return SoomgoRe.findById(id);
  }
  
  export async function findMyObituary(userId) {
    return SoomgoRe.find({userId}).sort({ createdAt: -1});
  }
  
  export async function findObituaryByname(name) {  
    return SoomgoRe.find({ $or: [{"title": name},
    {"kind":name}]}).sort({ createdAt: -1});
  }
  
  export async function save(obit) {
    return new SoomgoRe(obit).save()
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
    return SoomgoRe.findByIdAndUpdate(
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
    return SoomgoRe.findByIdAndDelete(id);
  }