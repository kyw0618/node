import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const feelList = new Mongoose.Schema( {
    title: {type: String}, 
    feeling: {type: Int32Array},
    timestamp: {type: String},
    background: {type: Int32Array},
    jurnalId: {type: String},
    devideId: {type: String},
    userId: {type: String}
  }, { 
    versionKey: false
  });

  useVirtualId(feelList);

const FeelList = Mongoose.model('FeelList', feelList);

export async function getAllObituary() {
    return FeelList.find().sort({ createdAt: -1});
  }
  
  export async function findById(id) {
    return FeelList.findById(id);
  }
  
  export async function findMyObituary(userId) {
    return FeelList.find({userId}).sort({ createdAt: -1});
  }
  
  export async function findObituaryByname(name) {
    return FeelList.find({ $or: [{"title": name},
        {"keyword": name}]}).sort({ createdAt: -1});
  }
  
  export async function save(obit) {
    return new FeelList(obit).save()
    .then((data) => data);
  }

  export async function update( 
    id, 
    title, 
    feeling,
    timestamp,
    background,
    jurnalId,
    devideId
    ) {
    return DataList.findByIdAndUpdate(
      id, {
        title, 
        feeling,
        timestamp,
        background,
        jurnalId,
        devideId
      }, 
      {
        returnOriginal: false}
        );
  }
  
  export async function remove(id) {
    return FeelList.findByIdAndDelete(id);
  }