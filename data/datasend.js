import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const datasend = new Mongoose.Schema( {
  TextImg: {type: Array},
  NorImg: {type: Array},
  Vieeo: {type: Array},    
  title: {type: String},
  keyword: {type: String},    
  timestamp: {type: String},
  defaultcode: {type: String},
  sensitivity: {type: String},
  sendcode : {type: String},    
  dataid: {type: String},
  userId: {type: String}
  }, { 
    versionKey: false
  });
  
  useVirtualId(datasend);
  
  const DataSend = Mongoose.model('DataSend', datasend);
  
  export async function getAllObituary() {
    return DataSend.find().sort({ createdAt: -1});
  }
  
  export async function findById(id) {
    return DataSend.findById(id);
  }
  
  export async function findMyObituary(userId) {
    return DataSend.find({userId}).sort({ createdAt: -1});
  }
  
  export async function findObituaryByname(name) {
    return DataSend.find({ $or: [{"title": name},
        {"keyword": name}]}).sort({ createdAt: -1});
  }
  
  export async function save(obit) {
    return new DataSend(obit).save()
    .then((data) => data);
  }
  
  export async function update( 
    id, 
    TextImg,
    NorImg,
    Vieeo,
    title, 
    keyword, 
    detail, 
    timestamp, 
    defaultcode, 
    sensitivity, 
    sendcode,
    dataid) {
    return DataSend.findByIdAndUpdate(id, {
      TextImg,
      NorImg,
      Vieeo,
      title, 
      keyword, 
      detail, 
      timestamp, 
      defaultcode, 
      sensitivity, 
      sendcode,
      dataid
    }, 
      {returnOriginal: false});
  }
  
  export async function remove(id) {
    return DataSend.findByIdAndDelete(id);
  }