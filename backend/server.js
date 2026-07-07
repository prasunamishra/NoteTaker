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

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find((item) => item.id === id)

  if (!note) {
    return res.status(404).json({ message: 'Note not found' })
  }

  res.json(note)
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
  console.log(req.body)

  const id = parseInt(req.params.id)
  const noteIndex = notes.findIndex((note) => note.id === id)

  if (noteIndex === -1) {
    return res.status(404).json({ message: 'Note not found' })
  }

  const updatedNote = { ...notes[noteIndex], ...req.body }
  notes[noteIndex] = updatedNote

  return res.json({ message: 'Note updated successfully', note: updatedNote })
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
