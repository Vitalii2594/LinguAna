import { Router } from 'express';
import {
  getLessons,
  getLesson,
  createLesson,
  updateLesson,
  deleteLesson,
  markLessonComplete
} from '../controllers/lessonController';
import { authenticateToken, requireRole } from '../middleware/auth';
import { validateLesson } from '../middleware/validation';

const router = Router();

router.get('/course/:courseId', getLessons);
router.get('/:id', authenticateToken, getLesson);
router.post('/course/:courseId', authenticateToken, requireRole(['teacher', 'admin']), validateLesson, createLesson);
router.put('/:id', authenticateToken, requireRole(['teacher', 'admin']), updateLesson);
router.delete('/:id', authenticateToken, requireRole(['teacher', 'admin']), deleteLesson);
router.post('/:lessonId/complete', authenticateToken, markLessonComplete);

export default router;