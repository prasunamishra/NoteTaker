import initialNotes from '../../data/initialNotes.js';
import InitialNote from '../../data/initialNote.js';

let notes = [...initialNotes];

export async function getAllNotes() {
  return notes;
}

export async function getNoteById(id) {
  return notes.find((note) => note.id === id);
}

export async function createNote({ title, body, category }) {
  const newNote = {
    id: Date.now(),
    title,
    body,
    category: category || 'Personal',
  };

  notes = [newNote, ...notes];
  return newNote;
}

export async function updateNote(id, updates) {
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    return null;
  }

  const updatedNote = { ...notes[noteIndex], ...updates };
  notes[noteIndex] = updatedNote;
  return updatedNote;
}

export async function deleteNote(id) {
  const originalLength = notes.length;
  notes = notes.filter((note) => note.id !== id);

  return notes.length !== originalLength;
}
