import { Types, isValidObjectId } from 'mongoose';

import { IProduct, IOrder } from './types';
import { ORDER_VALIDATION_MSG } from '../config';

import Product from '../models/product';

import BadRequestError from '../errors/badRequestError';

const validateOrderContent = async (value: IOrder) => {
  const { items, total } = value;
  const objectIds = items.filter(isValidObjectId).map((id) => new Types.ObjectId(id));

  return Product.find({ _id: { $in: objectIds } }, { price: 1 })
    .lean()
    .then((products) => {
      if (products.length !== items.length) throw new BadRequestError(ORDER_VALIDATION_MSG);
      const orderSum = products.reduce((sum, p:IProduct) => {
        if (!p.price) throw new BadRequestError(ORDER_VALIDATION_MSG);
        return sum + (p.price ?? 0);
      }, 0);

      if (orderSum !== total) throw new BadRequestError(ORDER_VALIDATION_MSG);
      return value;
    });
};

export default validateOrderContent;
