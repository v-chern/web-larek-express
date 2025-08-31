import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });

export const DB_ADDRESS = process.env.DB_ADDRESS ?? 'mongodb://127.0.0.1:27017/weblarek';
export const PORT = process.env.PORT ?? 3000;

export const PHONE_PATTERN = /^\+?[1-9]\d{9,14}$/;

export const ORDER_VALIDATION_MSG = 'Ошибка в составе заказа';
export const INTERNAL_SERVER_MSG = 'Внутренняя ошибка сервера';
export const NOT_FOUND_MSG = 'Маршрут не найден';
export const CONFLICT_PRODUCT_MSG = 'Конфликт в имени при создании товара';

export const REQUESTS_LOG = './logs/request.log';
export const ERRORS_LOG = './logs/error.log';
