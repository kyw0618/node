import Mongoose from 'mongoose';
import admin from 'firebase-admin';
import { config } from '../config.js';
import { readFile } from 'fs/promises';

const serviceAccount = JSON.parse(
  await readFile(
    new URL('../heaven-289ab-firebase-adminsdk-j7ifw-be12826516.json', import.meta.url)
  )
);

export async function connectDB() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://heaven-289ab-default-rtdb.firebaseio.com"
  });
  return Mongoose.connect(config.db.host)
    .then(() => console.log('MongoDB Connected...'));
}
