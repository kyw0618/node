import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const users = new Mongoose.Schema( {
  imgName: {type: String},
  phone: {type: String, requirer: true},
  sex: {type: String, requirer: true},
  name: {type: String, requirer: true},
  simplepw: {type: String, requirer: true,},
  deviceId: {type: String},
  deviceModel: {type: String},
  deviceOs: {type: String},
  deviceAppVersion: {type: String},
  dataTemperature: {type: String},
  level: {type: String},
  admin: {type: Boolean, requirer: true},

}, { 
  versionKey: false
});

const sms = new Mongoose.Schema( {
  phone: {type: String, required: true},
  number: {type: String, required: true} 
},{ 
  versionKey: false
})

const token = new Mongoose.Schema( {
  refreshtoken: {type: String},
  userid : {type: String}
}, {
  versionKey: false
}

)

useVirtualId(token);
useVirtualId(users);

const Token = Mongoose.model('Tokens', token);
const User = Mongoose.model('Users', users);
const Sms = Mongoose.model('sms', sms);

export async function saveSms(phone, number) {
  return new Sms({phone, number}).save().then();
}


export async function findSms(phone) {
  return Sms.findOne({phone}).then((data) => data.number);
}

export async function smsExists(phone) {
  return Sms.findOne({phone});
}

export async function updateSms(phone, newNumber) {
  return Sms.findOneAndUpdate({phone}, {number: newNumber}, {returnOriginal: false});
}

export async function findAllUser() {
  return User.find().then((data) => data);
}
export async function saveUser(user) {
  return new User(user).save().then((data) => data.id);
}

export async function updateRefreshToken(userid, token) {
  return Token.findOneAndUpdate({userid}, {refreshtoken: token}, {returnOriginal: false});
}

export async function saveToken(userid, refreshtoken) {
  return new Token({refreshtoken, userid}).save();
}

export async function findBytoken(token) {
  return Token.findOne({refreshtoken: token}).then((data) => data.userid)
}
export async function findRefreshToken(userid) {
  return Token.findOne({userid}).then((data) => data.refreshtoken);
}

export async function deleteRefreshToken(userid) {
  return Token.findOneAndDelete({userid});
}

export async function findById(id) {
  return User.findById(id);
}

export async function findUserName(id) {
  return User.findById(id).then(data => data.name);
}

export async function findUserTerms(id) {
  return User.findById(id).then((data) => data.terms);
}

export async function findByPhon(phone) {
  return User.findOne({phone});
}

export async function adminfindUser(data) {
  return User.find({ $or: [{"phone": data}, {"name": data}]}).sort({ createdAt: -1});
}

export async function update( 
  id, 
  phone, 
  sex,
  name,
  simplepw,
  deviceId,
  deviceModel,
  deviceOs,
  deviceAppVersion,
  dataTemperature,
  level
      ) {
  return User.findByIdAndUpdate(
    id, {
      phone, 
      sex,
      name,  
      simplepw,
      deviceId,
      deviceModel,
      deviceOs,
      deviceAppVersion,
      dataTemperature,
      level
    }, 
    {
      returnOriginal: false}
      );
}