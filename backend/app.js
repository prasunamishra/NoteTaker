import express from "express";
import notes from "./data/initialNotes.js";
const app = express();
app.use(express.json()); // middleware to parse incoming JSON requests, array lai json format ma pathauna lai chaixa yo
let watchlist = [];
const PORT = 3001; //default port is this in node.js

//creation of api in backend

app.get("/api/notes/:id", (req, res) => {
  // Number() safely handles large timestamp IDs like 1783405593170
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }
  return res.json(note);
});

app.listen(PORT, () => {
    console.log(`ok Backend is running on port ${PORT}`);
 })