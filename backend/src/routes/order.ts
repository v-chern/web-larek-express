import { Router } from 'express';
import createOrder from '../controllers/order';
import { orderBodyValidator } from '../middlewares/validators';

const router = Router();
router.post('/', orderBodyValidator, createOrder);

export default router;
