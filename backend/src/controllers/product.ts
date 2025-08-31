import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/product';
import ConflictError from '../errors/conflictError';
import BadRequestError from '../errors/badRequestError';
import { CONFLICT_PRODUCT_MSG } from '../config';

export const getProducts = (_req: Request, res: Response, next: NextFunction) => Product.find({})
  .then((products) => res.send({
    items: products,
    total: products.length,
  }))
  .catch((err) => next(err));

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const productItem = req.body;
  return Product.create(productItem)
    .then((product) => res.status(201).send({ data: product }))
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(CONFLICT_PRODUCT_MSG));
      }
      if (err instanceof MongooseError.ValidationError) {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};
