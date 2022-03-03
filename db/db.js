import Mongoose from 'mongoose';
import admin from 'firebase-admin';
import { config } from '../config.js';
import { readFile } from 'fs/promises';

const uri = "mongodb+srv://iium:wonder20@modioz.jck0n.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

async function connectDB() {
  return Mongoose.connect(uri)
  .then(() => console.log('Connected'));
};

connectDB().then(() => {
    console.log(`Server is started… ${new Date()}`);
    app.listen(8080);
  })
