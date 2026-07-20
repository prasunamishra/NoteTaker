import NoteCard from './NoteCard'

function NoteGrid({ notes, onDelete, onEdit }) {
  if (!notes.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-sm text-slate-500">
        No notes found. Create one to get started.
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note._id ?? note.id} note={note} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  )
}

export default NoteGrid
