const categoryStyles = {
  Personal: 'bg-emerald-100 text-emerald-700',
  Work: 'bg-sky-100 text-sky-700',
  Study: 'bg-violet-100 text-violet-700',
}

function NoteCard({ note, onDelete, onEdit }) {
  const noteId = note._id ?? note.id

  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{note.title}</h3>
          <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${categoryStyles[note.category] || 'bg-slate-100 text-slate-700'}`}>
            {note.category}
          </span>
        </div>
      </div>

      <p className="flex-1 text-sm leading-6 text-slate-600">{note.body}</p>

      <div className="mt-4 flex justify-end gap-2">
        <button type="button" onClick={() => onEdit(note)} className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
          Edit
        </button>
        <button type="button" onClick={() => onDelete(noteId)} className="rounded-full bg-rose-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-rose-600">
          Delete
        </button>
      </div>
    </article>
  )
}

export default NoteCard
