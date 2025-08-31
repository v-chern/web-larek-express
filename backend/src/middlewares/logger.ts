import winston from 'winston';
import expressWinston from 'express-winston';

import { REQUESTS_LOG, ERRORS_LOG } from '../config';

export const requestsLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: REQUESTS_LOG }),
  ],
  format: winston.format.json(),
});

export const errorsLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: ERRORS_LOG }),
  ],
  format: winston.format.json(),
});
