import { useEffect, useMemo, useState } from 'react'
import NewNoteButton from './components/NewNoteButton'
import NoteGrid from './components/NoteGrid'
import SearchBar from './components/SearchBar'
import { getAllNotes, addNote, updateNote, deleteNote } from './api/noteApi'

const emptyForm = {
  title: '',
  body: '',
  category: 'Personal',
}

function App() {
  const [notes, setNotes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchNotes() {
      try {
        setLoading(true)
        setError(null)
        const data = await getAllNotes()
        setNotes(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message || 'Unable to load notes from the server.')
        setNotes([])
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  const filteredNotes = useMemo(() => {
    const query = searchTerm.toLowerCase()
    return notes.filter((note) => `${note.title ?? ''} ${note.body ?? ''}`.toLowerCase().includes(query))
  }, [notes, searchTerm])

  const openModal = () => {
    setEditingNoteId(null)
    setFormData(emptyForm)
    setIsModalOpen(true)
  }

  const openEditModal = (note) => {
    setEditingNoteId(note._id ?? note.id)
    setFormData({
      title: note.title,
      body: note.body,
      category: note.category,
    })
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingNoteId(null)
    setFormData(emptyForm)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!formData.title.trim() || !formData.body.trim()) return

    const payload = {
      title: formData.title.trim(),
      body: formData.body.trim(),
      category: formData.category,
    }

    try {
      if (editingNoteId) {
        const response = await updateNote(editingNoteId, payload)
        const updatedNote = response.note ?? response

        setNotes((currentNotes) =>
          currentNotes.map((note) => ((note._id ?? note.id) === editingNoteId ? updatedNote : note)),
        )
      } else {
        const createdNote = await addNote(payload)
        setNotes((currentNotes) => [createdNote, ...currentNotes])
      }

      closeModal()
      setError(null)
    } catch (err) {
      setError(err.message || 'Unable to save the note.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteNote(id)
      setNotes((currentNotes) => currentNotes.filter((note) => (note._id ?? note.id) !== id))
      setError(null)
    } catch (err) {
      setError(err.message || 'Unable to delete the note.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Note Taking App</h1>
              <p className="mt-2 text-sm text-slate-600">This app loads notes from the backend database and keeps create, update, and delete actions in sync.</p>
            </div>
            <NewNoteButton onClick={openModal} />
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Your notes</h2>
              <p className="text-sm text-slate-500">Search and manage your notes.</p>
            </div>
            <div className="w-full md:max-w-sm">
              <SearchBar value={searchTerm} onChange={setSearchTerm} />
            </div>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm text-slate-500">
              Loading notes from the API...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm text-slate-500">
              Error: {error}
            </div>
          ) : (
            <NoteGrid notes={filteredNotes} onDelete={handleDelete} onEdit={openEditModal} />
          )}
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-8">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-2xl font-semibold">{editingNoteId ? 'Update note' : 'Add a new note'}</h3>
                <p className="text-sm text-slate-500">{editingNoteId ? 'Edit the selected note details below.' : 'Create a note and it will appear instantly in the grid.'}</p>
              </div>
              <button type="button" onClick={closeModal} className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-500 hover:bg-slate-100">
                Close
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="title">Title</label>
                <input
                  id="title"
                  value={formData.title}
                  onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-300 px-3 py-2"
                  placeholder="Enter a title"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="body">Details</label>
                <textarea
                  id="body"
                  rows="4"
                  value={formData.body}
                  onChange={(event) => setFormData((current) => ({ ...current, body: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-300 px-3 py-2"
                  placeholder="Add your note details"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="category">Category</label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(event) => setFormData((current) => ({ ...current, category: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-300 px-3 py-2"
                >
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Study">Study</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={closeModal} className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
                  Cancel
                </button>
                <button type="submit" className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                  {editingNoteId ? 'Update note' : 'Create note'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
