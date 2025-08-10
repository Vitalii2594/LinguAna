import { Router } from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  getMyEnrollments
} from '../controllers/courseController';
import { authenticateToken, requireRole } from '../middleware/auth';
import { validateCourse } from '../middleware/validation';

const router = Router();

router.get('/', getCourses);
router.get('/my-enrollments', authenticateToken, getMyEnrollments);
router.get('/:id', getCourse);
router.post('/', authenticateToken, requireRole(['teacher', 'admin']), validateCourse, createCourse);
router.put('/:id', authenticateToken, requireRole(['teacher', 'admin']), updateCourse);
router.delete('/:id', authenticateToken, requireRole(['teacher', 'admin']), deleteCourse);
router.post('/:courseId/enroll', authenticateToken, enrollInCourse);

export default router;