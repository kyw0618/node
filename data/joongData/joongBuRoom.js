import Mongoose from 'mongoose';
import {useVirtualId} from '../../db/db.js';

const joongbuRoom = new Mongoose.Schema( {
    title: {type: String},
    code: {type: String},
    limit: {type: String},
  }, { 
    versionKey: false
  });

  useVirtualId(joongbuRoom);

const JoongBuRoom = Mongoose.model('JoongBuRoom', joongbuRoom);

export async function getAllObituary() {
    return JoongBuRoom.find().sort({ createdAt: -1});
  }
  
  export async function findById(id) {
    return JoongBuRoom.findById(id);
  }
  
  export async function findMyObituary(userId) {
    return JoongBuRoom.find({userId}).sort({ createdAt: -1});
  }
  
  export async function findObituaryByname(name) {  
    return JoongBuRoom.find({ $or: [{"email": name},
    {"password":name}]}).sort({ createdAt: -1});
  }
  
  export async function save(obit) {
    return new JoongBuRoom(obit).save()
    .then((data) => data);
  }

  export async function update( 
    id,   
    title,
    code,
    limit,
    ) {
    return JoongBuRoom.findByIdAndUpdate(
      id, 
      {
        title,
        code,
        limit,
      }, 
      {
        returnOriginal: false}
        );
  }
  
  export async function remove(id) {
    return JoongBuRoom.findByIdAndDelete(id);
  }