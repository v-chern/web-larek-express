import { celebrate, Joi, Segments } from 'celebrate';

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
  { abortEarly: false}
);