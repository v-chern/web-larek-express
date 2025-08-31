import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';

import validateOrderContent from '../utils/validateOrderContent';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const order = req.body;
  try {
    await validateOrderContent(order);
    return res.status(200).send({
      id: faker.string.uuid(),
      total: order.total,
    });
  } catch (err) {
    return next(err);
  }
};

export default createOrder;
