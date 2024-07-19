import rateLimit from 'express-rate-limit';
import { BASELINE_API_RATE_LIMIT } from 'shared/types/const';

export const apiLimiter = rateLimit({
  limit: BASELINE_API_RATE_LIMIT,
  windowMs: 15 * 60 * 1000,
  legacyHeaders: false
});
