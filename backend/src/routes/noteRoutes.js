import express from 'express';
import {
  createNoteController,
  deleteNoteController,
  getAllNotesController,
  getNoteByIdController,
  updateNoteController,
} from '../controllers/noteController.js';
import authenticate from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.get('/', getAllNotesController);
router.get('/:id', getNoteByIdController);
router.post('/', createNoteController);
router.put('/:id', updateNoteController);
router.delete('/:id', deleteNoteController);

export default router;
