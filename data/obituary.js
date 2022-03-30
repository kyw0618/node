import Mongoose from 'mongoose';

const obituary = new Mongoose.Schema( {
  title: {type: Object},
  keyword: {type: Object},
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

export async function create( title,keyword,photo,video,detail,timestamp, userId) {
  return new Obituary({ title,keyword,photo,video,detail,timestamp, userid: userId}).save()
  .then((data) => data);
}

export async function update( id, title,keyword,photo,video,detail,timestamp) {
  return Obituary.findByIdAndUpdate(id, {title,keyword,photo,video,detail,timestamp}, {returnOriginal: false});
}

export async function remove(id) {
  return Obituary.findByIdAndDelete(id);
}