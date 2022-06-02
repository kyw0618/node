import express from 'express'
import morgan from 'morgan';
import { connectDB } from './db/db.js';
import { config } from './config.js';
import cors from 'cors';
import fs from 'fs';

import appRouter from './router/app.js';
import userRouter from './router/auth.js';
import obituaryRouter from './router/datalist.js';
import centerRouter from './router/serviceCenter.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

const options = { // letsencrypt로 받은 인증서 경로를 입력
  ca: fs.readFileSync('/etc/letsencrypt/live/www.aedo.co.kr/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/www.aedo.co.kr/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/www.aedo.co.kr/cert.pem')
  };
app.use('/v1/app', appRouter);
app.use('/v1/user', userRouter);
app.use('/v1/datalist', obituaryRouter);
app.use('/v1/center', centerRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
})

app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
})

connectDB().then(() => {
  console.log(`Server is started... ${new Date()}`);
})