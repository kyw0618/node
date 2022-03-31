import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const users = new Mongoose.Schema( {
  phone: {type: String},
  pw: {type: String},
  name: {type: String},
  terms: {type: String}
}, { 
  versionKey: false
});

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