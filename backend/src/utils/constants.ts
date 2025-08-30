export const DB_ADDRESS = process.env.DB_ADDRESS ?? 'mongodb://127.0.0.1:27017/weblarek';
export const PORT = process.env.PORT ?? 3000;

export const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;