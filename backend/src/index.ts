import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRouter from './routers/authRouter';
import productRouter from './routers/productRouter';
import companyRouter from './routers/companyRouter';

export const app = express();

async function startServer() {
  // db bağlantısı
  await mongoose.connect('mongodb://127.0.0.1/Ete-case')
  .then(async() => {
    console.log('connected');
  }).catch((err) => {
    console.log('err', err);
  });

  // post işlemi için gerekli
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(cors());

  // yönlendirmeler
  app.use('/auth', authRouter);
  app.use('/product', productRouter);
  app.use('/company', companyRouter);

  app.use('/', function (req, res) {
    res.status(200).json({ message: 'API' });
  });
  app.listen(process.env.PORT || '80', () => {
    console.log(`Server is running on port ${process.env.PORT || '80'}`);
  });
}

startServer();
