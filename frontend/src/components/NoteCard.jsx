function NoteCard({ title, content, category }) {

  let badgeColor = ""

  if (category === "Personal") {
    badgeColor = "bg-blue-500"
  }

  else if (category === "Work") {
    badgeColor = "bg-green-500"
  }

  else if (category === "Study") {
    badgeColor = "bg-purple-500"
  }

  return (

    <div className="bg-white p-5 rounded-xl shadow-md">

      <div className="flex justify-between items-center mb-3">

        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <span className={`text-white text-sm px-3 py-1 rounded-full ${badgeColor}`}>
          {category}
        </span>

      </div>

      <p className="text-gray-600">
        {content}
      </p>

    </div>
  )
}

export default NoteCard;