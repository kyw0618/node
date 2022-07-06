import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const documentList = new Mongoose.Schema( {
    doname: {type: String}, 
    address: {type: String},
    call: {type: String},
    username: {type: String},
    usernumber: {type: String},
    usercall: {type: String},
    userreqdocument: {type: String},
    imgUrl: {type: String}
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
    call,
    username,
    usernumber,
    usercall,
    userreqdocument,
    imgUrl
    ) {
    return DocumentList.findByIdAndUpdate(
      id, {
        doname, 
        address,
        call,
        username,
        usernumber,
        usercall,
        userreqdocument,
        imgUrl
      }, 
      {
        returnOriginal: false
    }
        );
  }
  
  export async function remove(id) {
    return DocumentList.findByIdAndDelete(id);
  }