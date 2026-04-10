import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './routes/auth.routes';
import journalRoutes from './routes/journal.routes';
import healthRoutes from './routes/health.routes';
import errorMiddleware from './middleware/errorMiddleware';

const app = express();

// Security
app.use(helmet());
app.disable('x-powered-by');

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN ?? '*',
}));

// Body parser dengan limit untuk mencegah DoS
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/journals', journalRoutes);

// Error handler — harus paling terakhir
app.use(errorMiddleware);

export default app;
