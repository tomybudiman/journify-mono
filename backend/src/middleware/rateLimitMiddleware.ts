import rateLimit from 'express-rate-limit';

const authRateLimit = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? '900000'),
  limit: parseInt(process.env.RATE_LIMIT_MAX ?? '10'),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Terlalu banyak percobaan. Silakan coba lagi dalam 15 menit.',
  },
});

export default authRateLimit;
