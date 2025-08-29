import { IOrder, PaymentType } from "./types";
import Product from '../models/product';
import { pathToFileURL } from "url";

const isItemsAndTotalValid = (items: string[], total: number) => {
  return true;
}

const isPaymentValid = (payment: PaymentType) => {
  return true;
}

const isEmailValid = (email: string) => {
  return true;
}

const isPhoneValid = (phone: string) => {
  return phone ? true : false;
}

const isAddressValid = (address: string) => {
  return address ? true : false;
}

export const isValidOrder = (orderData: IOrder) => {
  console.log();
  const orderStatus = isItemsAndTotalValid(orderData.items, orderData.total) 
    && isPaymentValid(orderData.payment)
    && isEmailValid(orderData.email)
    && isPhoneValid(orderData.phone)
    && isAddressValid(orderData.address);
  return orderStatus;
};
