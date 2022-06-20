import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const datasend = new Mongoose.Schema( {  
  Text: {type: Array, required: true},
  Normal: {type: Array, required: true},
  Video: {type: Array, required: true},
  title: {type: String, required: true},
  keyword: {type: String, required: true},    
  timestamp: {type: String, required: true},
  sendcode: {type: String, required: true}, 
  defaultcode: {type: String, required: true},
  userId: {type: String, required: true}
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
    Text,
    Normal,
    Video,
    title,
    keyword, 
    timestamp,
    sendcode, 
    defaultcode,
    userId
    ) {
    return DataSend.findByIdAndUpdate(id, {
      id,
      Text,
      Normal,
      Video,
      title,
      keyword, 
      timestamp,
      sendcode, 
      defaultcode,
      userId
    }, 
      {returnOriginal: false});
  }
  
  export async function remove(id) {
    return DataSend.findByIdAndDelete(id);
  }