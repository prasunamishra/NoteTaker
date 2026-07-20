import {body, validationResult} from 'express-validator';

export const noteValidator = [
  body('title').trim().isLength({ min: 2, max: 100 }).withMessage('Title must be between 2 and 100 characters'),
  body('content').trim().isLength({ min: 2 }).withMessage('Content must be at least 2 characters long')
];

export const validateNotes = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};