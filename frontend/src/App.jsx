import NoteGrid from "./components/NoteGrid"
import NewNoteButton from "./components/NewNoteButton";

function App() {

  return (
    <>
      <h1 className="text-3xl font-bold text-center mt-10">
        Note Taker App
      </h1>
    <div>
       <div> <NewNoteButton /></div>
       
      <NoteGrid />
      </div>
    </>
  )
}

export default App;