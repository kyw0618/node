import Mongoose from 'mongoose';
import {useVirtualId} from '../../db/db.js';

const joongbuAuth = new Mongoose.Schema( {
    email: {type: String}, 
    password: {type: String},
    schoolnumber: {type: String},
    schoolcollage: {type: String},
    name: {type: String},
    phone: {type: String},
    birth: {type: String},
    sex: {type: String},
    terms: {type: String}
  }, { 
    versionKey: false
  });

  useVirtualId(joongbuAuth);

const JoongBoAuth = Mongoose.model('JoongBoAuth', joongbuAuth);

export async function getAllObituary() {
    return JoongBoAuth.find().sort({ createdAt: -1});
  }
  
  export async function findById(id) {
    return JoongBoAuth.findById(id);
  }
  
  export async function findMyObituary(userId) {
    return JoongBoAuth.find({userId}).sort({ createdAt: -1});
  }
  
  export async function findObituaryByname(name) {  
    return JoongBoAuth.find({ $or: [{"email": name},
    {"password":name}]}).sort({ createdAt: -1});
  }
  
  export async function save(obit) {
    return new JoongBoAuth(obit).save()
    .then((data) => data);
  }

  export async function update( 
    id,   
    email, 
    password,
    schoolnumber,
    schoolcollage,
    name,
    phone,
    birth,
    sex,
    terms
    ) {
    return JoongBoAuth.findByIdAndUpdate(
      id, 
      {
        email, 
        password,
        schoolnumber,
        schoolcollage,
        name,
        phone,
        birth,
        sex,
        terms
      }, 
      {
        returnOriginal: false}
        );
  }
  
  export async function remove(id) {
    return JoongBoAuth.findByIdAndDelete(id);
  }