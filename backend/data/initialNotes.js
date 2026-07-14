import mongoose from "mongoose"
import initialNote from "./initialNote.js"
import dotenv from "dotenv"

dotenv.config({ path: '.env' })

const notes = [
  {
    title: 'Project plan',
    body: 'Outline the weekly milestones and the final presentation structure.',
    category: 'Work',
  },
  {
    title: 'Grocery list',
    body: 'Pick up fruit, pasta, and coffee before Friday evening.',
    category: 'Personal',
  },
  {
    title: 'Study notes',
    body: 'Review React state management and the Express REST API basics.',
    category: 'Study',
  },
  {
    title: 'Weekend ideas',
    body: 'Try a new brunch spot and revisit the local art museum.',
    category: 'Personal',
  },
]
const connection = mongoose.connect(process.env.MONGO_URI,{});
await initialNote.deleteMany({})
await initialNote.insertMany(notes)

export default notes;
