import NoteCard from "./NoteCard"

function NoteGrid({ notes }) {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">

      {
        notes.map((note) => (

          <NoteCard
            key={note.id}
            title={note.title}
            content={note.content}
            category={note.category}
          />

        ))
      }

    </div>
  )
}

export default NoteGrid