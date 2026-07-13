import initialNotes from '../../data/initialNotes.js';

let notes = [...initialNotes];

export function getAllNotes() {
  return notes;
}

export function getNoteById(id) {
  return notes.find((note) => note.id === id);
}

export function createNote({ title, body, category }) {
  const newNote = {
    id: Date.now(),
    title,
    body,
    category: category || 'Personal',
  };

  notes = [newNote, ...notes];
  return newNote;
}

export function updateNote(id, updates) {
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    return null;
  }

  const updatedNote = { ...notes[noteIndex], ...updates };
  notes[noteIndex] = updatedNote;
  return updatedNote;
}

export function deleteNote(id) {
  const originalLength = notes.length;
  notes = notes.filter((note) => note.id !== id);

  return notes.length !== originalLength;
}
