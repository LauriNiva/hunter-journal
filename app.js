import express from 'express';
const app = express();
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import 'dotenv/config.js';
import logsRouter from './controllers/logs.controllers.js';
import usersRouter from './controllers/users.controller.js'
import requestlogger from './middleware/requestlogger.js';


mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((error) => {
    console.log('error conneting to db: ', error.message);
  })


app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));



app.use(requestlogger);

app.use('/api/logs', logsRouter);
app.use('/api/users', usersRouter);

app.use(express.static('./frontend/build'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});