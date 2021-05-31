import path from 'path';
import logger from 'morgan';
import express from 'express';
import sessionRouter from './routes/session';
import photoRouter from './routes/photo';
import commentRouter from './routes/comment';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/session', sessionRouter);
app.use('/photo', photoRouter);
app.use('/comment', commentRouter);

export = app;
