import express from 'express'
import morgan from 'morgan';
import { connectDB } from './db/db.js';
import { config } from './config.js';
import appRouter from './router/app.js';
import userRouter from './router/auth.js';
import obituaryRouter from './router/datalist.js';
import sendRouter from './router/datasend.js';
import centerRouter from './router/serviceCenter.js';
import mapRouter from './router/map.js';
import documentRouter from './router/document.js';
import calendarFeel from './router/calendar.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));

app.use('/v1/app', appRouter);
app.use('/v1/user', userRouter);
app.use('/v1/datalist', obituaryRouter);
app.use('/v1/datasend', sendRouter);
app.use('/v1/center', centerRouter);
app.use('/v1/map', mapRouter);
app.use('/v1/document', documentRouter);
app.use('/v1/calendar', calendarFeel);


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