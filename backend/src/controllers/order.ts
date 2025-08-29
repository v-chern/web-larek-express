import { Request, Response } from "express";
import { faker } from '@faker-js/faker';

import { isValidOrder } from "../utils/orderUtils";

export const createOrder = (req: Request, res: Response) => {
  const order = req.body;

  if (isValidOrder(order)) {
    return res.status(200).send({
      "id": faker.string.uuid(),
      "total": 750
    });
  }
  return res.status(400).send({ message: 'Incorrect order data' });
}