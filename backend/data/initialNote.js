import mongoose from "mongoose";

const initialNoteSchema = mongoose.Schema({
  title: {
    type: String,   
    required: true,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
  },
    category: {
      type: String,
      required: true,
      enum: ["Work", "Personal", "Study"],
    }
});
const InitialNote = mongoose.model("InitialNote", initialNoteSchema);
export default InitialNote;
 