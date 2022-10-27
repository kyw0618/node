import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const dateCalendar = new Mongoose.Schema({
  year : {type: Number},
  month: {type: Number},
  day: {type: Number},
  dayOfWeek: {type: String}
});

const feelCalendar = new Mongoose.Schema({
  id : {type: Number},
  colorRes : {type: Number},
  representation: {type: String},
  representationPast: {type: String},
  iconRes: {type: Number}
});

const feelList = new Mongoose.Schema( {
    title: {type: String}, 
    feeling: feelCalendar,
    timestamp: dateCalendar,
    detail:{type: String},
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
    {"timestamp":name}]}).sort({ createdAt: -1});
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
    detail
    ) {
    return FeelList.findByIdAndUpdate(
      id, 
      {
        title, 
        feeling,
        timestamp,
        detail
      }, 
      {
        returnOriginal: false}
        );
  }
  
  export async function remove(id) {
    return FeelList.findByIdAndDelete(id);
  }