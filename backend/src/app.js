import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import noteRoutes from './routes/noteRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const app = express();
app.use(cookieParser());

app.use(cors(
  {
    origin:(origin, callback) => {
      if (!origin || ['http://localhost:5173']){
        return callback(null, true);
      }
      callback(new Error('Not allowed by CORS'));
    }
  }
));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'Notes API is running' });
});

app.use('/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

export default app;
