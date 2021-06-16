import path from 'path';
import logger from 'morgan';
import express from 'express';
import sessionRouter from './routes/session';
import photoRouter from './routes/photo';
import commentRouter from './routes/comment';

const app = express();

app.use(
  logger('dev', {
    skip(req, res) {
      return (res.getHeader('Content-Type') || '').indexOf('application/json') < 0;
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/session', sessionRouter);
app.use('/api/photo', photoRouter);
app.use('/api/comment', commentRouter);

export = app;
