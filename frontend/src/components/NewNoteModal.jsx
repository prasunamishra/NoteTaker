import { useState } from "react"

function NewNoteModal({ addNote }) {

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

function handleSubmit(e) {

  e.preventDefault()

  const newNote = {

    id: Date.now(),
    title: title,
    content: content,
    category: "Personal"

  }

  addNote(newNote)

  setTitle("")
  setContent("")
}

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-xl shadow-md mb-6"
    >

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border w-full p-2 rounded-lg mb-4"
      />

      <textarea
        placeholder="Enter note"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border w-full p-2 rounded-lg mb-4"
      ></textarea>

      <button className="bg-black text-white px-4 py-2 rounded-lg">
        Save Note
      </button>

    </form>
  )
}

export default NewNoteModal