import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: 
    { type: String,
      required: true },
    description:
     { type: String,
       required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true },
);


const Note = mongoose.model("Note", noteSchema);
const arr = [1, 2, 3];
console.log(arr.map(x => x * 2)); // [2, 4, 6]
export default Note;