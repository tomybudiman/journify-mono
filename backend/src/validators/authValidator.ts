import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateRegister = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Nama tidak boleh kosong')
    .isLength({ max: 255 })
    .withMessage('Nama maksimal 255 karakter'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email tidak boleh kosong')
    .isEmail()
    .withMessage('Format email tidak valid')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password tidak boleh kosong')
    .isLength({ min: 8 })
    .withMessage('Password minimal 8 karakter'),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array().map((e) => ({
          field: e.type === 'field' ? e.path : 'unknown',
          message: e.msg,
        })),
      });
      return;
    }
    next();
  },
];

export const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email tidak boleh kosong')
    .isEmail()
    .withMessage('Format email tidak valid')
    .normalizeEmail(),

  body('password')
    .notEmpty()
    .withMessage('Password tidak boleh kosong'),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        errors: errors.array().map((e) => ({
          field: e.type === 'field' ? e.path : 'unknown',
          message: e.msg,
        })),
      });
      return;
    }
    next();
  },
];
