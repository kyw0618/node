import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { connectDB } from './db/db.js';
import { config } from './config.js';
import appRouter from './router/app.js';
import userRouter from './router/auth.js';
import obituaryRouter from './router/obituary.js';

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser());

app.use('/v1/app', appRouter);
app.use('/v1/user', userRouter);
app.use('/v1/obituary', obituaryRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
})

app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
})

connectDB().then(() => {
  console.log(`Server is started... ${new Date()}`);
  app.listen(config.port);
})