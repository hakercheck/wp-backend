import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import guestRoutes from './routes/guestRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import vendorDisplayRoutes from './routes/vendorDisplayRoutes.js';
import vendorSelectRoutes from './routes/vendorSelectRoutes.js';
import OrderRoutes from './routes/OrderRoutes.js';
import cors from 'cors';

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/vendor', itemRoutes);
app.use('/api/vendorDisplay', vendorDisplayRoutes);
app.use('/api/vendorSelect', vendorSelectRoutes);
app.use('/api/order', OrderRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));