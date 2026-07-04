import NoteCard from "./NoteCard"

function NoteGrid() {

  const notes = [

    {
      title: "Buy Groceries",
      content: "Milk, Bread, Eggs",
      category: "Personal"
    },

    {
      title: "Project Meeting",
      content: "Discuss frontend design",
      category: "Work"
    },

    {
      title: "Study React",
      content: "Learn components and props",
      category: "Study"
    },

    {
      title: "Morning Exercise",
      content: "30 minutes jogging",
      category: "Personal"
    }

  ]

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">

      {
        notes.map((note, index) => (

          <NoteCard
            key={index}
            title={note.title}
            content={note.content}
            category={note.category}
          />

        ))
      }

    </div>
  )
}

export default NoteGrid;