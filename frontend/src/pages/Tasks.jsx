import { useState } from 'react'

function Tasks() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title.trim()) return

    setMessage(`Note created: ${title}`)
    setTitle('')
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">Tasks</h2>
      <p className="mt-2 text-sm text-slate-600">Create a note using a simple controlled form.</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter note title"
          className="w-full rounded-2xl border border-slate-300 px-3 py-2"
        />
        <button type="submit" className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
          Add Note
        </button>
      </form>

      {message && <p className="mt-4 rounded-2xl bg-emerald-100 px-3 py-2 text-sm text-emerald-700">{message}</p>}
    </div>
  )
}

export default Tasks
