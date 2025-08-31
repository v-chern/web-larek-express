import { Router } from "express";
import { createOrder } from "../controllers/order";
import { orderBodyValidator } from "../utils/orderUtils";

const router = Router();
router.post('/', orderBodyValidator, createOrder);

export default router;