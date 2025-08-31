import path from 'path';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { errors as celebrateErrors } from 'celebrate';

import { DB_ADDRESS, PORT } from './config';

import errorHandler from './middlewares/errorHandler';
import notFound from './middlewares/notFound';
import { errorsLogger, requestsLogger } from './middlewares/logger';

import productRouter from './routes/product';
import orderRouter from './routes/order';

mongoose.connect(DB_ADDRESS);

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(requestsLogger);

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(notFound);

app.use(celebrateErrors());

app.use(errorsLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});