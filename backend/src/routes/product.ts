import { Router } from "express";
import { getProducts, createProduct } from "../controllers/product";
import { productBodyValidator } from "../utils/productUtils";

const router = Router();
router.get('/', getProducts);

router.post('/', productBodyValidator, createProduct);

export default router;