import { useState, useEffect } from "react"

import NoteGrid from "./components/NoteGrid"
import NewNoteButton from "./components/NewNoteButton"
import SearchBar from "./components/SearchBar"

function App() {

  const [notes, setNotes] = useState([

    {
      id: 1,
      title: "Buy Groceries",
      content: "Milk, Bread, Eggs",
      category: "Personal"
    },

    {
      id: 2,
      title: "Project Meeting",
      content: "Discuss frontend design",
      category: "Work"
    },

    {
      id: 3,
      title: "Study React",
      content: "Learn components and props",
      category: "Study"
    },

    {
      id: 4,
      title: "Morning Exercise",
      content: "30 minutes jogging",
      category: "Personal"
    }

  ])

  useEffect(() => {

    console.log("Total Notes:", notes.length)

  }, [notes])

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Note Taker App
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

        <SearchBar />

        <NewNoteButton />

      </div>

      <NoteGrid notes={notes} />

    </div>

  )
}

export default App;