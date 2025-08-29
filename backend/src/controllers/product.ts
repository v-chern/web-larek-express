import { Request, Response } from "express";
import Product from '../models/product';

export const getProducts = (req: Request, res: Response) => {
  return Product.find({})
    .then((products) => res.send({
      items: products,
      total: products.length
    }))
    .catch(() => res.status(500).send({message: "Internal Server Error"}));
}

export const createProduct = (req: Request, res: Response) => {
  const productItem = req.body;
  return Product.create( productItem )
    .then((product) => res.send({data: product}))
    .catch(() => res.status(500).send({message: "Internal Server Error"}));
}