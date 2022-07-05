import Mongoose from 'mongoose';

const mapSchema = new Mongoose.Schema( {
    map: {type: Array},
  }, {
    versionKey: false
  });

  useVirtualId(mapSchema);

  const NaverMap = Mongoose.model('map', mapSchema);

export async function getAllObituary() {
  return NaverMap.find().sort({ createdAt: -1});
}

export async function showMap() {
    return NaverMap.findOne();
  }

export async function findById(id) {
  return NaverMap.findById(id);
}

export async function findMyObituary(userId) {
  return NaverMap.find({userId}).sort({ createdAt: -1});
}

export async function findObituaryByname(name) {
  return NaverMap.find({ $or: [
    {"title": name},
    {"keyword": name}]}).sort({ createdAt: -1});
}

export async function save(obit) {
  return new NaverMap(obit).save()
  .then((data) => data);
}

export async function update( 
  id, 
  name,
  xvalue,
  yvalue,
  address,
  call
  ) {
  return NaverMap.findByIdAndUpdate(
    id, {
        name,
        xvalue,
        yvalue,
        address,
        call
    }, 
    {
      returnOriginal: false}
      );
}

export async function remove(id) {
  return NaverMap.findByIdAndDelete(id);
}