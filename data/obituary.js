import Mongoose from 'mongoose';

const obituary = new Mongoose.Schema( {
  title: {type: Object},
  photo: {type: Object},
  video: {type: Object},
  detail: {type: Object},
  rating: {type: Object},
  timestamp: {type: Object},
  userid: {type: String}
}, { 
  versionKey: false
});

const Obituary = Mongoose.model('Obituary', obituary);

export async function getAllObituary() {
  return Obituary.find().sort({ createdAt: -1});
}

export async function getAllById(id) {
  return Obituary.findById(id);
}

export async function findMyObituary(userId) {
  return Obituary.find({"userid": userId}).sort({ createdAt: -1});
}
export async function findObituaryByname(name) {
  return Obituary.find({ $or: [{"title.title": name}]}).sort({ createdAt: -1});
}

export async function create( title,gourp,photo,video,detail,rating,timestamp, userId) {
  return new Obituary({ title,gourp,photo,video,detail,rating,timestamp, userid: userId}).save()
  .then((data) => data);
}

export async function update( id, title,gourp,photo,video,detail,rating,timestamp) {
  return Obituary.findByIdAndUpdate(id, {title,gourp,photo,video,detail,rating,timestamp}, {returnOriginal: false});
}

export async function remove(id) {
  return Obituary.findByIdAndDelete(id);
}