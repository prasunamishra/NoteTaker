import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from '../models/noteModel.js';

export async function getAllNotesController(_req, res) {
  res.json(await getAllNotes());
}

export async function getNoteByIdController(req, res) {
  const id = Number(req.params.id);
  const note = await getNoteById(id);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  return res.json(note);
}

export async function createNoteController(req, res) {
  const { title, body, category } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required.' });
  }

  const newNote = await createNote({ title, body, category });
  return res.status(201).json(newNote);
}

export async function updateNoteController(req, res) {
  const id = Number(req.params.id);
  const updatedNote = await updateNote(id, req.body);

  if (!updatedNote) {
    return res.status(404).json({ message: 'Note not found' });
  }

  return res.json({ message: 'Note updated successfully', note: updatedNote });
}

export async function deleteNoteController(req, res) {
  const id = Number(req.params.id);
  const removed = await deleteNote(id);

  if (!removed) {
    return res.status(404).json({ error: 'Note not found.' });
  }

  return res.status(204).send();
}
