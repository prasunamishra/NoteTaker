import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../models/noteModel.js';

export async function getAllNotesController(req, res) {
  const userId = req.user.id;
  res.json(await getAllNotes(userId));
}

export async function getNoteByIdController(req, res) {
  const id = req.params.id;
  const userId = req.user.id;
  const note = await getNoteById(id, userId);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  return res.json(note);
}

export async function createNoteController(req, res) {
  const { title, body, category } = req.body;
  const userId = req.user.id;

  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required.' });
  }

  const newNote = await createNote({ title, body, category, userId });
  return res.status(201).json(newNote);
}

export async function updateNoteController(req, res) {
  const id = req.params.id;
  const userId = req.user.id;
  const updatedNote = await updateNote(id, req.body, userId);

  if (!updatedNote) {
    return res.status(404).json({ message: 'Note not found' });
  }

  return res.json({ message: 'Note updated successfully', note: updatedNote });
}

export async function deleteNoteController(req, res) {
  const id = req.params.id;
  const userId = req.user.id;
  const removed = await deleteNote(id, userId);

  if (!removed) {
    return res.status(404).json({ error: 'Note not found.' });
  }

  return res.status(204).send();
}
