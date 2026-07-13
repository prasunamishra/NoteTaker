import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../models/noteModel.js';

export function getAllNotesController(_req, res) {
  res.json(getAllNotes());
}

export function getNoteByIdController(req, res) {
  const id = Number(req.params.id);
  const note = getNoteById(id);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  return res.json(note);
}

export function createNoteController(req, res) {
  const { title, body, category } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required.' });
  }

  const newNote = createNote({ title, body, category });
  return res.status(201).json(newNote);
}

export function updateNoteController(req, res) {
  const id = Number(req.params.id);
  const updatedNote = updateNote(id, req.body);

  if (!updatedNote) {
    return res.status(404).json({ message: 'Note not found' });
  }

  return res.json({ message: 'Note updated successfully', note: updatedNote });
}

export function deleteNoteController(req, res) {
  const id = Number(req.params.id);
  const removed = deleteNote(id);

  if (!removed) {
    return res.status(404).json({ error: 'Note not found.' });
  }

  return res.status(204).send();
}
