import axios from 'axios'

const api = axios.create({
  baseURL: '/api/notes',
})

export function getAllNotes() {
  return api.get('/').then((response) => response.data)
}

export function addNote(note) {
  return api.post('/', note).then((response) => response.data)
}

export function updateNote(id, note) {
  return api.put(`/${id}`, note).then((response) => response.data)
}

export function deleteNote(id) {
  return api.delete(`/${id}`).then((response) => response.data)
}

