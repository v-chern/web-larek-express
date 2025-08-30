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

import {Types, isValidObjectId} from 'mongoose';
import { IProduct, IOrder, PaymentType } from "./types";
import { EMAIL_FORMAT } from './constants';

import Product from '../models/product';

const isItemsAndTotalValid = async (items: string[], total: number) => {
  const objectIds = items.filter(isValidObjectId).map(id => new Types.ObjectId(id));

  return Product.find({ _id: { $in: objectIds} }, {price: 1})
      .lean()
      .then((products) => {
        if (products.length !== items.length) throw new Error('Product IDs not found');
        const orderSum = products.reduce((sum, p:IProduct) => {
          if (!p.price) throw new Error('Product price is null');
          return sum + (p.price ?? 0);
        }, 0);

        if (orderSum !== total) throw new Error('Incorrect order sum');
        return true;
      })
}

const isPaymentValid = (payment: PaymentType) => {
  if (!Object.values(PaymentType).includes(payment)) throw new Error(`Incorrect payment type ${payment}`)
  return true;
}

const isEmailValid = (email: string) => {
  if (!email || !EMAIL_FORMAT.test(email)) throw new Error(`Incorrect email format ${email}`);
  return true;
}

const isPhoneValid = (phone: string) => {
  if (!phone || (typeof phone !== 'string')) throw new Error(`Incorrect phone format ${phone}`);
  return true;
}

const isAddressValid = (address: string) => {
  if (!address || (typeof address !== 'string')) throw new Error(`Incorrect address format ${address}`);
  return true;
}

export const validateOrder = async (orderData: IOrder) => {
  console.log();
  const orderStatus = await isItemsAndTotalValid(orderData.items, orderData.total) 
    && isPaymentValid(orderData.payment)
    && isEmailValid(orderData.email)
    && isPhoneValid(orderData.phone)
    && isAddressValid(orderData.address);
  return orderStatus;
};
