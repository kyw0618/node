import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from './config.js';
import appRouter from './router/app.js';
import userRouter from './router/auth.js';

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(cookieParser());

app.use('/v1/app', appRouter);
app.use('/v1/user', userRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
})

app.use((error, req, res, next) => {
  console.log(error);
  res.sendStatus(500);
});