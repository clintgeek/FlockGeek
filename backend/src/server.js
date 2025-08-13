import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';

import birdsRouter from './routes/birds.js';
import groupsRouter from './routes/groups.js';
import eggProductionRouter from './routes/eggProduction.js';
import { requireOwner } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.set('trust proxy', 1);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://datageek_admin:DataGeek_Admin_2024@192.168.1.17:27018/datageek?authSource=admin';
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://localhost:5002,http://localhost:5001')
  .split(',')
  .map((s) => s.trim());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'CORS: Origin not allowed';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Owner-Id']
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/flockgeek/v1/birds', requireOwner, birdsRouter);
app.use('/api/flockgeek/v1/groups', requireOwner, groupsRouter);
app.use('/api/flockgeek/v1/egg-production', requireOwner, eggProductionRouter);

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`FlockGeek API listening on ${PORT}`);
});
