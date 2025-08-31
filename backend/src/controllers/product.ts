import { Request, Response, NextFunction} from "express";
import Product from '../models/product';
import ConflictError from "../errors/conflictError";
import BadRequestError from "../errors/badRequestError";
import { Error as MongooseError } from 'mongoose';
import { CONFLICT_PRODUCT_MSG } from "../utils/constants";

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
  return Product.find({})
    .then((products) => res.send({
      items: products,
      total: products.length
    }))
    .catch((err) => next(err));
}

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const productItem = req.body;
  return Product.create( productItem )
    .then((product) => res.send({data: product}))
    .catch((err) => {
      if (err.code === 11000) {
        err = new ConflictError(CONFLICT_PRODUCT_MSG);
      } else if (err instanceof MongooseError.ValidationError) {
        err = new BadRequestError(err.message)
      }
      next(err);
    });
}