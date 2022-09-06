import {useVirtualId} from '../db/db.js';

const documentList = new Mongoose.Schema( {
    doname: {type: String}, 
    address: {type: String},
    address_city: {type: String},
    address_district: {type: String},
    address_location: {type: String},
    call: {type: String},
    username: {type: String},
    usernumber: {type: String},
    usercall: {type: String},
    userreqdocument: {type: String},
    imgUrl: {type: String},
    timestamp: {type: String}
  }, { 
    versionKey: false
  });

  useVirtualId(documentList);

  const DocumentList = Mongoose.model('DocumentList', documentList);

  export async function getAllObituary() {
    return DocumentList.find().sort({ createdAt: -1});
  }
  
  export async function findById(id) {
    return DocumentList.findById(id);
  }
  
  export async function findMyObituary(userId) {
    return DocumentList.find({userId}).sort({ createdAt: -1});
  }
  
  export async function findObituaryByname(name) {
    return DocumentList.find({ $or: [{"doname": name},
        {"username": name},{"usernumber":name}]}).sort({ createdAt: -1});
  }
  
  export async function save(obit) {
    return new DocumentList(obit).save()
    .then((data) => data);
  }

  export async function update( 
    id, 
    doname, 
    address,
    address_city,
    address_district,
    address_location,
    call,
    username,
    usernumber,
    usercall,
    userreqdocument,
    imgUrl,
    timestamp
    ) {
    return DocumentList.findByIdAndUpdate(
      id, {
        doname, 
        address,
        address_city,
        address_district,
        address_location,
        call,
        username,
        usernumber,
        usercall,
        userreqdocument,
        imgUrl,
        timestamp
      }, 
      {
        returnOriginal: false
    }
        );
  }
  
  export async function remove(id) {
    return DocumentList.findByIdAndDelete(id);
  }