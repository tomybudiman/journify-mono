import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateCreateJournal = [
  body('date')
    .trim()
    .notEmpty()
    .withMessage('Tanggal tidak boleh kosong')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('Format tanggal harus YYYY-MM-DD'),

  body('title')
    .trim()
    .notEmpty()
    .withMessage('Judul tidak boleh kosong')
    .isLength({ max: 255 })
    .withMessage('Judul maksimal 255 karakter'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Konten tidak boleh kosong'),

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

export const validateUpdateJournal = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Judul tidak boleh kosong')
    .isLength({ max: 255 })
    .withMessage('Judul maksimal 255 karakter'),

  body('content')
    .trim()
    .notEmpty()
    .withMessage('Konten tidak boleh kosong'),

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
