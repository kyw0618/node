import Mongoose from 'mongoose';

const announcement = new Mongoose.Schema( {
  title: {type: String},
  content: {type: String},
  created: {type: String}
}, { 
  versionKey: false,
});

const Announcement = Mongoose.model('Announcement', announcement);

export async function findAll() {
  return Announcement.find().sort({ createdAt: -1});
}

export async function finById(id) {
  return Announcement.findById(id);
}

export async function create(title, content, created) {
  return new Announcement({title, content, created}).save()
    .then((data) => data);
}

export async function update(id, title, content) {
  return Announcement.findByIdAndUpdate(id, {title, content}, {returnOriginal: false});
}

export async function remove(id) {
  return Announcement.findByIdAndDelete(id);
}