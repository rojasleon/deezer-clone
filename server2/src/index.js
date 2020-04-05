import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import searchRoutes from './routes/searchRoutes';
import requireAuth from './middlewares/requireAuth';

const app = express();

mongoose.connect(
  'mongodb://rojasleon:Lionelmessi10@ds163294.mlab.com:63294/deezer-clone',
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo instance');
});

mongoose.connection.on('error', (error) => {
  console.log('Error connecting to Mongo', error);
});

app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);
app.use(searchRoutes);

app.get('/', requireAuth, (req, res) => {
  console.log(req.user);
  res.send(req.user);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Listening...');
});