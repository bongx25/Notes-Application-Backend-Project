import express from 'express';
import Note from '../models/Note.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

//get all notes for the logged in user
router.get("/", protect, async (req, res) => {
  try {
    const notes = await Note.find({ createdBy: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//create a new note by a logged in user
router.post("/", protect, async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!title || !description) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const note = await Note.create({
      title,
      description,
      createdBy: req.user._id
    });
    res.status(201).json(note);
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  } 
});

//get a single note by id for the logged in user
router.get("/:id", protect, async (req, res) => {
  try{
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    } 
    return res.status(200).json(note);
  }
  catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//update a note by id for the logged in user
router.put("/:id", protect, async (req, res) => {
  const { title, description } = req.body;  
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    if (note.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    } 
    note.title = title || note.title;
    note.description = description || note.description;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//delete a note by id for the logged in user
router.delete("/:id", protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);  
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    if (note.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    await note.deleteOne();
    res.json({ message: "Note deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  } 
});

export default router;
