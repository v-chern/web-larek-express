import { celebrate, Joi, Segments } from 'celebrate';

import { PaymentType } from '../utils/types';
import { PHONE_PATTERN } from '../config';

const productSchema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  image: Joi.object({
    fileName: Joi.string().required(),
    originalName: Joi.string().required(),
  }).required(),
  category: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(0).allow(null),
})
  .unknown(false);

export const productBodyValidator = celebrate(
  { [Segments.BODY]: productSchema },
  { abortEarly: false },
);

const orderSchema = Joi.object({
  payment: Joi.string().valid(...Object.values(PaymentType)).required(),
  email: Joi.string().trim().email({ tlds: { allow: false } }).required(),
  phone: Joi.string().trim().pattern(PHONE_PATTERN).required(),
  address: Joi.string().trim().min(1).max(300)
    .required(),
  total: Joi.number().integer().min(0).required(),
  items: Joi.array().items(Joi.string()).min(1).required(),
})
  .unknown(false);

export const orderBodyValidator = celebrate(
  { [Segments.BODY]: orderSchema },
  { abortEarly: false },
);
