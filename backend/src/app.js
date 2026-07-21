import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import noteRoutes from './routes/noteRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Notes API is running' });
});

app.use('/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

export default app;
