import path from 'path';
import express, { NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { DB_ADDRESS, PORT } from './utils/constants';

import { errorHandler } from './middlewares/errorHandler';

import productRouter from './routes/product';
import orderRouter from './routes/order';
import NotFoundError from './errors/notFoundError';

mongoose.connect(DB_ADDRESS);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(errorHandler);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});