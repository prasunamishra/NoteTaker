import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import initialNotes from "./data/initialNotes.js";

dotenv.config();

const app = express();
const PORT = 3001;
let notes = [...initialNotes];

app.use(cors());
app.use(express.json());

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  return res.json(note);
});

app.post("/api/notes", (req, res) => {
  const { title, body, category } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required." });
  }

  const newNote = {
    id: Date.now(),
    title,
    body,
    category: category || "Personal",
  };

  notes = [newNote, ...notes];
  res.status(201).json(newNote);
});

app.put("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    return res.status(404).json({ message: "Note not found" });
  }

  const updatedNote = { ...notes[noteIndex], ...req.body };
  notes[noteIndex] = updatedNote;

  return res.json({ message: "Note updated successfully", note: updatedNote });
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const originalLength = notes.length;
  notes = notes.filter((note) => note.id !== id);

  if (notes.length === originalLength) {
    return res.status(404).json({ error: "Note not found." });
  }

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});