import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const mapSchema = new Mongoose.Schema( {
  result: {type: Boolean},
  map: {type: Array},
  }, {
    versionKey: false
  });

  useVirtualId(mapSchema);

  const mapdb = Mongoose.model('Map', mapSchema, 'map');

export async function showMap() {
    return mapdb.findOne();
  }

