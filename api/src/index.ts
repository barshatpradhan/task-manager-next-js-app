// Load environment variables FIRST - before any other imports
import './config/env.js';

// Now import everything else
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Rest of your code...

// CORS
// app.use(cors({
//   origin: [FRONTEND_URL, 'http://localhost:3000', 'http://127.0.0.1:3000'],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// }));

const allowedOrigins = [
  FRONTEND_URL,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5173', // Vite default
  'http://127.0.0.1:5173',
];

// Add production URL if it exists
if (process.env.PRODUCTION_FRONTEND_URL) {
  allowedOrigins.push(process.env.PRODUCTION_FRONTEND_URL);
}

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health & Info
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api', (req, res) => {
  res.json({ message: 'Task Manager API', version: '1.0.0' });
});

// Static files & SPA fallback
app.use(express.static(path.join(__dirname, '../dist')));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handler (must be last)
app.use(errorHandler);

// Conditional server start
// if (process.env.NODE_ENV !== 'production') {
//   app.listen(PORT, () => {
//     console.log('═══════════════════════════════════════');
//     console.log(`🚀 Server: http://localhost:${PORT}`);
//     console.log('═══════════════════════════════════════');
//   });
// }

// Render will automatically inject a PORT (usually 10000), 
// so ensure you are using process.env.PORT.
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server ready on port ${PORT}`);
});

// ES module export (not CommonJS)
export default app;