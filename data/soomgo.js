import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const recipeList = new Mongoose.Schema( {
    title: {type: String}, 
    expirationdate_first: {type: String},
    expirationdate_second: {type: String},
    count:{type: String},
    refrigerator: {type: String},
    kind: {type: String},
    timestamp: {type: String}
  }, { 
    versionKey: false
  });

  useVirtualId(recipeList);

const RecipeList = Mongoose.model('recipeList', recipeList);

export async function getAllObituary() {
    return RecipeList.find().sort({ createdAt: -1});
  }
  
  export async function findById(id) {
    return RecipeList.findById(id);
  }
  
  export async function findMyObituary(userId) {
    return RecipeList.find({userId}).sort({ createdAt: -1});
  }
  
  export async function findObituaryByname(name) {  
    return RecipeList.find({ $or: [{"title": name},
    {"kind":name}]}).sort({ createdAt: -1});
  }
  
  export async function save(obit) {
    return new RecipeList(obit).save()
    .then((data) => data);
  }

  export async function update( 
    id,   
    title, 
    expirationdate_first,
    expirationdate_second,
    count,
    refrigerator,
    kind,
    timestamp
    ) {
    return RecipeList.findByIdAndUpdate(
      id, 
      {
        title, 
        expirationdate_first,
        expirationdate_second,
        count,
        refrigerator,
        kind,
        timestamp
      }, 
      {
        returnOriginal: false}
        );
  }
  
  export async function remove(id) {
    return RecipeList.findByIdAndDelete(id);
  }