# Flight Tracker App - Common Issues & Fixes

Based on the repository structure (React + TypeScript + Express + PostgreSQL + Drizzle ORM), here are the most common issues and their fixes:

---

## 1. Database Connection Issues

### Problem: PostgreSQL connection errors
**Fix the `.env` configuration:**

```env
# .env
DATABASE_URL=postgresql://username:password@localhost:5432/flighttracker
NODE_ENV=development
PORT=5000
```

**Fix database connection in server code:**

```typescript
// server/db.ts or similar
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const client = postgres(connectionString);
export const db = drizzle(client);
```

---

## 2. CORS Issues

### Problem: Frontend can't communicate with backend
**Fix in `server/index-dev.ts` or `server/routes.ts`:**

```typescript
import express from 'express';
import cors from 'cors';

const app = express();

// Add CORS middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
```

---

## 3. API Route Issues

### Problem: Routes return undefined or error responses
**Fix in `server/routes.ts`:**

```typescript
import { Router } from 'express';
import { db } from './db';
import { flights } from '../shared/schema';

const router = Router();

// Health check
router.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all flights with error handling
router.get('/api/flights', async (req, res) => {
  try {
    const allFlights = await db.select().from(flights);
    res.json(allFlights);
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ 
      error: 'Failed to fetch flights',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
```

---

## 4. Database Schema Issues

### Problem: Database migrations fail or tables don't exist
**Ensure proper schema definition in `shared/schema.ts`:**

```typescript
import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const flights = pgTable('flights', {
  id: serial('id').primaryKey(),
  flightNumber: varchar('flight_number', { length: 10 }).notNull(),
  airline: varchar('airline', { length: 100 }).notNull(),
  origin: varchar('origin', { length: 100 }).notNull(),
  destination: varchar('destination', { length: 100 }).notNull(),
  departureTime: timestamp('departure_time').notNull(),
  arrivalTime: timestamp('arrival_time').notNull(),
  status: varchar('status', { length: 50 }).default('scheduled'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export type Flight = typeof flights.$inferSelect;
export type NewFlight = typeof flights.$inferInsert;
```

**Run migrations properly:**

```bash
# Generate migration
npm run drizzle-kit generate

# Push to database
npm run db:push
```

---

## 5. Frontend API Integration Issues

### Problem: React app can't fetch data from backend
**Fix in `client/src/lib/api.ts` (create if doesn't exist):**

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function fetchFlights() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/flights`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw error;
  }
}
```

**Fix in `client/src/App.tsx` using TanStack Query:**

```typescript
import { useQuery } from '@tanstack/react-query';
import { fetchFlights } from './lib/api';

function App() {
  const { data: flights, isLoading, error } = useQuery({
    queryKey: ['flights'],
    queryFn: fetchFlights,
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  if (isLoading) return <div>Loading flights...</div>;
  if (error) return <div>Error loading flights: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Flight Tracker</h1>
      <div className="grid gap-4">
        {flights?.map((flight) => (
          <div key={flight.id} className="border p-4 rounded-lg shadow">
            <h3 className="font-bold">{flight.flightNumber}</h3>
            <p>{flight.origin} → {flight.destination}</p>
            <p className="text-sm text-gray-600">{flight.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
```

---

## 6. Build Issues

### Problem: Production build fails or doesn't serve correctly
**Fix in `server/index-prod.ts`:**

```typescript
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());

// API routes first
app.use(routes);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../dist/client')));

// Handle React routing - send all other requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/client/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 7. Environment Variables Not Loading

### Problem: Variables in .env aren't accessible
**Create `.env.example`:**

```env
DATABASE_URL=postgresql://username:password@localhost:5432/flighttracker
NODE_ENV=development
PORT=5000
VITE_API_URL=http://localhost:5000
```

**Fix in `vite.config.ts` for client-side env vars:**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```

---

## 8. TypeScript Type Errors

### Problem: Type mismatches between frontend and backend
**Create shared types in `shared/types.ts`:**

```typescript
export interface Flight {
  id: number;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: Date | string;
  arrivalTime: Date | string;
  status: 'scheduled' | 'delayed' | 'departed' | 'arrived' | 'cancelled';
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
```

---

## 9. Query Client Setup Issues

### Problem: TanStack Query not working properly
**Fix in `client/src/main.tsx`:**

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

---

## 10. Database Not Initializing

### Problem: Tables don't exist on first run
**Create an initialization script `server/init-db.ts`:**

```typescript
import { db } from './db';
import { sql } from 'drizzle-orm';

async function initDatabase() {
  try {
    // Check if tables exist
    await db.execute(sql`SELECT 1 FROM flights LIMIT 1`);
    console.log('Database tables already exist');
  } catch (error) {
    console.log('Initializing database...');
    // Run migrations
    // This should be handled by drizzle-kit
    console.log('Please run: npm run db:push');
  }
}

initDatabase();
```

---

## Quick Fix Checklist

1. ✅ Verify `.env` file exists with correct `DATABASE_URL`
2. ✅ Run `npm install` in root directory
3. ✅ Run `npm run db:push` to create database tables
4. ✅ Check PostgreSQL is running: `psql -U your_username -d flighttracker`
5. ✅ Start development server: `npm run dev`
6. ✅ Check browser console for errors (F12)
7. ✅ Check terminal for backend errors
8. ✅ Verify API endpoint works: `curl http://localhost:5000/api/health`
9. ✅ Check CORS settings if frontend can't reach backend
10. ✅ Ensure all dependencies are installed correctly

---

## Common Commands

```bash
# Install dependencies
npm install

# Start development server (both frontend and backend)
npm run dev

# Push database schema
npm run db:push

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run check

# Format code
npm run format
```

---

## Additional Tips

- **Check Node version**: Ensure you're using Node.js >= 18.0.0
- **PostgreSQL connection**: Make sure PostgreSQL is running and accessible
- **Port conflicts**: If port 5000 or 5173 is in use, change in respective config files
- **Clear cache**: Sometimes `rm -rf node_modules package-lock.json && npm install` helps
- **Database connection string format**: `postgresql://user:password@host:port/database`

If you encounter specific errors, check the browser console and terminal output for detailed error messages.
