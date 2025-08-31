/**
 * Функциии валидации объекта заказа
 * items — массив с _id товаров, непустой массив:
      необходимо проверить, что переданный _id существует в базе;
      проверить, что товар продается, т. е. поле price не равно null.
 * total — общая сумма заказа, число, обязательное:
      проверить, что стоимость переданных товаров в сумме равна total.
 * payment — enum, возможные значения — card или online, обязательное;
 * email — строка, валидный email, обязательное;
 * phone — строка, обязательное;
 * address — строка, обязательное.
 */

import { Types, isValidObjectId } from 'mongoose';
import { celebrate, Joi, Segments } from 'celebrate';

import { IProduct, IOrder, PaymentType } from "./types";
import { PHONE_PATTERN, ORDER_VALIDATION_MSG } from './constants';

import Product from '../models/product';

import BadRequestError from '../errors/badRequestError';

const orderSchema = Joi.object({
  payment: Joi.string().valid(...Object.values(PaymentType)).required(),
  email: Joi.string().trim().email({ tlds: { allow: false } }).required(),
  phone: Joi.string().trim().pattern(PHONE_PATTERN).required(),
  address: Joi.string().trim().min(1).max(300).required(),
  total: Joi.number().integer().min(0).required(),
  items: Joi.array().items(Joi.string()).min(1).required()
})
  .unknown(false);

export const orderBodyValidator = celebrate(
  { [Segments.BODY]: orderSchema },
  { abortEarly: false}
);

export const validateOrderContent = async (value: IOrder) => {
  const {items, total} = value;
  console.log(items, total);
  const objectIds = items.filter(isValidObjectId).map(id => new Types.ObjectId(id));

  return Product.find({ _id: { $in: objectIds} }, {price: 1})
      .lean()
      .then((products) => {
        if (products.length !== items.length) throw new BadRequestError(ORDER_VALIDATION_MSG);
        const orderSum = products.reduce((sum, p:IProduct) => {
          if (!p.price) new BadRequestError(ORDER_VALIDATION_MSG);
          return sum + (p.price ?? 0);
        }, 0);

        if (orderSum !== total) throw new BadRequestError(ORDER_VALIDATION_MSG);
        return value;
      })
}
