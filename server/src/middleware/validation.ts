import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

export const validateRegistration = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('firstName').trim().isLength({ min: 1 }).withMessage('First name is required'),
  body('lastName').trim().isLength({ min: 1 }).withMessage('Last name is required'),
  body('role').optional().isIn(['student', 'teacher', 'admin']),
  handleValidationErrors
];

export const validateLogin = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  handleValidationErrors
];

export const validateCourse = [
  body('title').isObject().withMessage('Title must be an object with language keys'),
  body('description').isObject().withMessage('Description must be an object with language keys'),
  body('language').isIn(['german', 'spanish', 'french', 'italian', 'english']),
  body('level').isIn(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
  body('lessonsCount').isInt({ min: 1 }).withMessage('Lessons count must be a positive integer'),
  handleValidationErrors
];

export const validateLesson = [
  body('title').isObject().withMessage('Title must be an object with language keys'),
  body('content').isObject().withMessage('Content must be an object with language keys'),
  body('order').isInt({ min: 1 }).withMessage('Order must be a positive integer'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
  body('videoUrl').optional().isURL().withMessage('Video URL must be valid'),
  handleValidationErrors
];

export const validateDictionaryEntry = [
  body('word').trim().isLength({ min: 1 }).withMessage('Word is required'),
  body('translation').isObject().withMessage('Translation must be an object with language keys'),
  body('language').isIn(['german', 'spanish', 'french', 'italian', 'english']),
  body('pronunciation').optional().isString(),
  body('examples').optional().isObject(),
  handleValidationErrors
];