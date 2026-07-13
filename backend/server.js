import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 3001;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
  });
};

start();
