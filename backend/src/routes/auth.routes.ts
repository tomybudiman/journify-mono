import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import authMiddleware from '../middleware/authMiddleware';
import authRateLimit from '../middleware/rateLimitMiddleware';
import { validateRegister, validateLogin } from '../validators/authValidator';

const router = Router();

router.post('/register', authRateLimit, validateRegister, AuthController.register);
router.post('/login', authRateLimit, validateLogin, AuthController.login);
router.post('/logout', authMiddleware, AuthController.logout);

export default router;
