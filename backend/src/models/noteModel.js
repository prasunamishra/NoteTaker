import InitialNote from '../../data/initialNote.js';

export async function getAllNotes() {
  return await InitialNote.find();
}

export async function getNoteById(id) {
  return await InitialNote.findById(id);
}

export async function createNote({ title, body, category }) {
  const newNote = new InitialNote({
    title,
    body,
    category: category || 'Personal',
  });
  return await newNote.save();
}

export async function updateNote(id, updates) {
  return await InitialNote.findByIdAndUpdate(id, updates, { new: true });
}

export async function deleteNote(id) {
  const result = await InitialNote.findByIdAndDelete(id);
  return result !== null;
}
