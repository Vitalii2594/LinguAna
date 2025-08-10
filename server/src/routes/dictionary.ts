import { Router } from 'express';
import {
  getDictionaryEntries,
  createDictionaryEntry,
  updateDictionaryEntry,
  deleteDictionaryEntry
} from '../controllers/dictionaryController';
import { authenticateToken } from '../middleware/auth';
import { validateDictionaryEntry } from '../middleware/validation';

const router = Router();

router.get('/', authenticateToken, getDictionaryEntries);
router.post('/', authenticateToken, validateDictionaryEntry, createDictionaryEntry);
router.put('/:id', authenticateToken, updateDictionaryEntry);
router.delete('/:id', authenticateToken, deleteDictionaryEntry);

export default router;