import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const soomgoList = new Mongoose.Schema( {
    title: {type: String}, 
    expirationdate_first: {type: Number},
    expirationdate_second: {type: String},
    count:{type: String},
    refrigerator: {type: String},
    kind: {type: String},
    timestamp: {type: String}
  }, { 
    versionKey: false
  });

  useVirtualId(soomgoList);

const SoomgoList = Mongoose.model('SoomgoList', soomgoList);

export async function getAllObituary() {
    return SoomgoList.find().sort({ createdAt: -1});
  }
  
  export async function findById(id) {
    return SoomgoList.findById(id);
  }
  
  export async function findMyObituary(userId) {
    return SoomgoList.find({userId}).sort({ createdAt: -1});
  }
  
  export async function findObituaryByname(name) {  
    return SoomgoList.find({ $or: [{"title": name},
    {"kind":name}]}).sort({ createdAt: -1});
  }
  
  export async function save(obit) {
    return new SoomgoList(obit).save()
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
    return SoomgoList.findByIdAndUpdate(
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
    return SoomgoList.findByIdAndDelete(id);
  }