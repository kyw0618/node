import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const datasend = new Mongoose.Schema( {  
  title: {type: String},
  keyword: {type: String},
  textlist: {type: String},
  normallist: {type: String},
  videolist: {type: String},    
  timestamp: {type: String},
  defaultcode: {type: String},
  sensitivity_first_code: {type: String},
  sensitivity_two_code: {type: String},
  sensitivity_third_code: {type: String},
  sensitivity_four_code: {type: String},
  sensitivity_five_type: {type: String},
  sendcode: {type: String}, 
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
    title, 
    keyword,
    textlist,
    normallist,
    videolist,
    timestamp,
    defaultcode,
    sensitivity_first_code,
    sensitivity_two_code,
    sensitivity_third_code,
    sensitivity_four_code,
    sensitivity_five_type,
    sendcode,
    dataid,
    userId
    ) {
    return DataSend.findByIdAndUpdate(
      id, {
        id, 
        title, 
        keyword,
        textlist,
        normallist,
        videolist,
        timestamp,
        defaultcode,
        sensitivity_first_code,
        sensitivity_two_code,
        sensitivity_third_code,
        sensitivity_four_code,
        sensitivity_five_type,
        sendcode,
        dataid,
      userId
    }, 
      {returnOriginal: false});
  }
  
  export async function remove(id) {
    return DataSend.findByIdAndDelete(id);
  }