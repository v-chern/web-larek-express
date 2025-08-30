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

export interface IProduct {
  title: string;
  image: {
    fileName : string;
    originalName: string;
  };
  category: string;
  description?: string;
  price?: number | null;
}
