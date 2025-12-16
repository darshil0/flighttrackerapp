import './dotenv.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import routes from './routes';
import { testConnection } from './db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API routes (must come before static files)
app.use(routes);

// Serve static files from the dist directory
const distPath = path.join(__dirname, '../dist/client');
app.use(express.static(distPath));

// Handle React routing - send all non-API requests to index.html
app.get('*', (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  res.sendFile(path.join(distPath, 'index.html'));
});

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong'
  });
});

async function startServer() {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('Failed to connect to database. Please check your DATABASE_URL.');
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`
🚀 Production server started successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌐 Server:        http://localhost:${PORT}
📊 Health Check:  http://localhost:${PORT}/api/health
🛫 Flights API:   http://localhost:${PORT}/api/flights
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Environment: production
`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
