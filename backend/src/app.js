import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import noteRoutes from './routes/noteRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import aiRouter from './routes/aiRoutes.js';

dotenv.config({ path: '../.env' });
dotenv.config();

const app = express();
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL,
  process.env.VITE_APP_URL,
].filter(Boolean);

app.use(cors(
  {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.netlify.app')) {
        return callback(null, true);
      }
      callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true
  }
));
app.use(express.json());


app.get('/', (_req, res) => {
  res.json({ message: 'Notes API is running' });
});

app.get('/health', (req, res) => res.status(200).json({ ok: true }))


app.use('/auth', authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/ai', aiRouter);

export default app;
