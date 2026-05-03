import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import authRoutes from './routes/auth.js';
import notesRoutes from './routes/notes.js';


dotenv.config(); 
const PORT = process.env.PORT || 5000;   

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);


connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});