import path from 'path';
import express, { NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { errors } from 'celebrate';

import { DB_ADDRESS, PORT } from './utils/constants';

import errorHandler from './middlewares/errorHandler';
import notFound from './middlewares/notFound';

import productRouter from './routes/product';
import orderRouter from './routes/order';

mongoose.connect(DB_ADDRESS);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use(notFound);

app.use(errors());

app.use(errorHandler);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});