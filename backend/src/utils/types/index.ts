export enum PaymentType {
  Card = 'card',
  Online = 'online',
}

export interface IOrder {
    payment: PaymentType;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}