import { Router } from 'express';
import JournalController from '../controllers/JournalController';
import authMiddleware from '../middleware/authMiddleware';
import { validateCreateJournal, validateUpdateJournal } from '../validators/journalValidator';

const router = Router();

router.get('/', authMiddleware, JournalController.getAllJournals);
router.get('/:id', authMiddleware, JournalController.getJournalById);
router.post('/', authMiddleware, validateCreateJournal, JournalController.createJournal);
router.put('/:id', authMiddleware, validateUpdateJournal, JournalController.updateJournal);
router.delete('/:id', authMiddleware, JournalController.deleteJournal);

export default router;
