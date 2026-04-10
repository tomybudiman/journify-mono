import { Router, Request, Response } from 'express';
import db from '../config/db';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<void> => {
  const isAlive = await db.ping();

  if (isAlive) {
    res.status(200).json({
      success: true,
      message: 'Server berjalan',
    });
  } else {
    res.status(503).json({
      success: false,
      message: 'Database tidak dapat diakses',
    });
  }
});

export default router;
