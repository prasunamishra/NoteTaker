import mongoose from 'mongoose';
import User from '../../data/user.js';
import InitialNote from '../../data/initialNote.js';

export async function getAllNotes(userId) {
  const user = await User.findById(userId).select('notes');
  const embeddedNotes = user?.notes ?? [];

  if (embeddedNotes.length > 0) {
    return embeddedNotes;
  }

  const legacyNotes = await InitialNote.find({ userId });
  if (legacyNotes.length > 0) {
    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          notes: {
            $each: legacyNotes.map((note) => ({
              _id: note._id,
              title: note.title,
              body: note.body,
              category: note.category,
              createdAt: note.createdAt,
              updatedAt: note.updatedAt,
            })),
          },
        },
      },
      { new: true }
    );
    return legacyNotes;
  }

  return [];
}

export async function getNoteById(id, userId) {
  const user = await User.findById(userId).select('notes');
  const embeddedNote = user?.notes?.find((note) => note._id.toString() === id.toString());
  if (embeddedNote) return embeddedNote;

  const legacyNote = await InitialNote.findOne({ _id: id, userId });
  return legacyNote ?? null;
}

export async function createNote({ title, body, category, userId }) {
  const newNote = {
    _id: new mongoose.Types.ObjectId(),
    title,
    body,
    category: category || 'Personal',
  };

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $push: { notes: newNote } },
    { new: true, runValidators: true }
  );

  return updatedUser?.notes?.at(-1) ?? newNote;
}

export async function updateNote(id, updates, userId) {
  const updateFields = {};

  if (updates.title !== undefined) updateFields['notes.$.title'] = updates.title;
  if (updates.body !== undefined) updateFields['notes.$.body'] = updates.body;
  if (updates.category !== undefined) updateFields['notes.$.category'] = updates.category;

  if (Object.keys(updateFields).length === 0) {
    return null;
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId, 'notes._id': id },
    { $set: updateFields },
    { new: true }
  );

  return updatedUser?.notes?.find((note) => note._id.toString() === id.toString()) ?? null;
}

export async function deleteNote(id, userId) {
  const result = await User.updateOne({ _id: userId }, { $pull: { notes: { _id: id } } });
  return result.modifiedCount > 0;
}
