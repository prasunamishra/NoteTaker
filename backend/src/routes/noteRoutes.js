import express from 'express';
import { noteValidator, validateNotes } from '../validators/noteValidator.js';
import {
  createNoteController,
  deleteNoteController,
  getAllNotesController,
  getNoteByIdController,
  updateNoteController,
} from '../controllers/noteController.js';

const router = express.Router();

router.get('/', getAllNotesController);
router.get('/:id', getNoteByIdController);
router.post('/', createNoteController);
router.put('/:id', updateNoteController);
router.delete('/:id', deleteNoteController);

export default router;
