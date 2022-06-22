import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const dataocr = new Mongoose.Schema( {
  version: {type: String},
  requestId: {type: String},
  timestamp: {type: String}, 
  images: {type: Array},
  userId: {type: String}
  }, { 
    versionKey: false
  });
  
  useVirtualId(dataocr);
  
  const DataOcr = Mongoose.model('DataOCR', dataocr);

  export async function getAllObituary() {
    return DataOcr.find().sort({ createdAt: -1});
  }
  
  export async function findById(id) {
    return DataOcr.findById(id);
  }
  
  export async function findMyObituary(userId) {
    return DataOcr.find({userId}).sort({ createdAt: -1});
  }
  
  export async function findObituaryByname(name) {
    return DataOcr.find({ $or: [{"title": name},
        {"keyword": name}]}).sort({ createdAt: -1});
  }
  
  export async function save(obit) {
    return new DataOcr(obit).save()
    .then((data) => data);
  }
  
  export async function update( 
    id, 
    version,
    requestId,
    timestamp, 
    images,
    ) {
    return DataOcr.findByIdAndUpdate(
      id, {
        version,
        requestId,
        timestamp, 
        images,
      }, 
      {
        returnOriginal: false}
        );
  }
  
  export async function remove(id) {
    return DataOcr.findByIdAndDelete(id);
  }