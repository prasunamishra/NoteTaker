import NoteGrid from "./components/NoteGrid"
import NewNoteButton from "./components/NewNoteButton"
import SearchBar from "./components/SearchBar"

function App() {

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Note Taker App
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

        <SearchBar />

        <NewNoteButton />

      </div>

      <NoteGrid />

    </div>

  )
}

export default App;