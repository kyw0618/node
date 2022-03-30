import Mongoose from 'mongoose';

const condoleMessage = new Mongoose.Schema( {
  title: {type: String},
  content: {type: String},
  name: {type: String},
  created: {type: String},
  obId: {type: String},
  userId: {type: String},
}, { 
  versionKey: false
});

const Condole = Mongoose.model('Condole', condoleMessage);

export async function findById(id) {
  return Condole.findById(id);
}

export async function create(title, content, name, created,obId, userId) {
  return new Condole({title, content, name, created, obId, userId}).save();
}

export async function update(id, title, content) {
  return Condole.findByIdAndUpdate(id, {title, content}, {returnOriginal: false});
} 

export async function remove(id) {
  return Condole.findByIdAndDelete(id);
}

export async function findByObId(obId) {
  return Condole.find({"obId" : obId}).sort({createdAt: -1});
}