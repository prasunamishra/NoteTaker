import InitialNote from '../../data/initialNote.js';

export async function getAllNotes(userId) {
  return await InitialNote.find({ userId });
}

export async function getNoteById(id, userId) {
  return await InitialNote.findOne({ _id: id, userId });
}

export async function createNote({ title, body, category, userId }) {
  const newNote = new InitialNote({
    userId,
    title,
    body,
    category: category || 'Personal',
  });
  return await newNote.save();
}

export async function updateNote(id, updates, userId) {
  return await InitialNote.findOneAndUpdate({ _id: id, userId }, updates, { new: true });
}

export async function deleteNote(id, userId) {
  const result = await InitialNote.findOneAndDelete({ _id: id, userId });
  return result !== null;
}
