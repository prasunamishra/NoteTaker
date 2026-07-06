import { useEffect, useState } from 'react'

function Dashboard() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3001/api/notes')
      .then((response) => response.json())
      .then((data) => {
        setNotes(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p className="mt-2 text-sm text-slate-600">A simple view of your current notes.</p>

      {loading ? (
        <p className="mt-4 text-sm text-slate-500">Loading notes...</p>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {notes.map((note) => (
            <div key={note.id} className="rounded-2xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-900">{note.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{note.body}</p>
              <span className="mt-3 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {note.category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
