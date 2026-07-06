import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import initialNotes from './data/initialNotes.js'

dotenv.config()

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

let notes = [...initialNotes]

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.post('/api/notes', (req, res) => {
  const { title, body, category } = req.body

  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required.' })
  }

  const newNote = {
    id: Date.now(),
    title,
    body,
    category: category || 'Personal',
  }

  notes = [newNote, ...notes]
  res.status(201).json(newNote)
})

app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params
  const { title, body, category } = req.body

  const noteIndex = notes.findIndex((note) => note.id === Number(id))
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found.' })
  }

  notes[noteIndex] = {
    ...notes[noteIndex],
    title: title || notes[noteIndex].title,
    body: body || notes[noteIndex].body,
    category: category || notes[noteIndex].category,
  }

  res.json(notes[noteIndex])
})

app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params
  const originalLength = notes.length
  notes = notes.filter((note) => note.id !== Number(id))

  if (notes.length === originalLength) {
    return res.status(404).json({ error: 'Note not found.' })
  }

  res.status(204).send()
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
