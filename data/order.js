import Mongoose from 'mongoose';
import {useVirtualId} from '../db/db.js';

const orders = new Mongoose.Schema( {
  place: {type: Object},
  receiver: {type: Object},
  sender: {type: Object},
  word: {type: Object},
}, { 
  versionKey: false
});

useVirtualId(orders);

const Orders = Mongoose.model('Order', orders);

export async function saveOrder(order) {
  return new Orders(order).save().then((data) => data);
}

export async function findOrder(value) {
  return Orders.find({$or : 
    [{"receiver.name": value},
    {"receiver.phone": value},
    {"sender.name": value},
    {"sender.phone" : value}]}).sort({createdAt: -1});
}

