# Flight Tracker App - Setup Guide

## 📋 Files Fixed and Created

### Critical Files Created/Fixed:
1. ✅ `.env` - Environment configuration
2. ✅ `.env.example` - Environment template
3. ✅ `server/db.ts` - Database connection with error handling
4. ✅ `server/routes.ts` - Complete CRUD API routes
5. ✅ `server/index-dev.ts` - Development server with Vite
6. ✅ `server/index-prod.ts` - Production server
7. ✅ `shared/schema.ts` - Enhanced database schema
8. ✅ `shared/types.ts` - TypeScript type definitions
9. ✅ `client/src/lib/api.ts` - API client functions
10. ✅ `client/src/main.tsx` - React Query setup
11. ✅ `client/src/App.tsx` - Complete flight tracker UI
12. ✅ `vite.config.ts` - Vite configuration with proxy
13. ✅ `drizzle.config.ts` - Database ORM configuration
14. ✅ `package.json` - Updated dependencies and scripts
15. ✅ `tsconfig.json` - TypeScript configuration

---

## 🚀 Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and update with your PostgreSQL credentials
# Replace 'username', 'password', and 'flighttracker' with your actual values
```

**Example `.env` configuration:**
```env
DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/flighttracker
NODE_ENV=development
PORT=5000
VITE_API_URL=http://localhost:5000
```

### 3. Create PostgreSQL Database
```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE flighttracker;

# Exit psql
\q
```

### 4. Push Database Schema
```bash
npm run db:push
```

This will create all the necessary tables in your PostgreSQL database.

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at:
- **Frontend:** http://localhost:5000
- **API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

---

## 🧪 Testing the Application

### Test the Health Endpoint
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-11-24T...",
  "environment": "development"
}

```

### Test Getting Flights
```bash
curl http://localhost:5000/api/flights
```

### Test Creating a Flight
```bash
curl -X POST http://localhost:5000/api/flights \
  -H "Content-Type: application/json" \
  -d '{
    "flightNumber": "AA100",
    "airline": "American Airlines",
    "origin": "New York (JFK)",
    "destination": "Los Angeles (LAX)",
    "departureTime": "2024-11-25T10:00:00Z",
    "arrivalTime": "2024-11-25T13:30:00Z",
    "status": "scheduled",
    "gate": "A12",
    "terminal": "4",
    "aircraft": "Boeing 737"
  }'
```

---

## 🏗️ Build for Production

### 1. Build the Application
```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Build the React frontend
- Create optimized production files in `dist/`

### 2. Start Production Server
```bash
npm start
```

Or with explicit NODE_ENV:
```bash
NODE_ENV=production node dist/server/index-prod.js
```

---

## 📁 File Structure

```
flighttrackerapp/
├── .env                          # Environment variables (create this)
├── .env.example                  # Environment template
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite bundler configuration
├── drizzle.config.ts             # Database ORM configuration
│
├── client/                       # Frontend React app
│   ├── index.html
│   └── src/
│       ├── main.tsx              # Entry point with QueryClient
│       ├── App.tsx               # Main app component
│       ├── index.css             # Global styles
│       └── lib/
│           └── api.ts            # API client functions
│
├── server/                       # Backend Express server
│   ├── index-dev.ts              # Development server
│   ├── index-prod.ts             # Production server
│   ├── routes.ts                 # API routes
│   └── db.ts                     # Database connection
│
├── shared/                       # Shared code between frontend/backend
│   ├── schema.ts                 # Database schema
│   └── types.ts                  # TypeScript types
│
└── migrations/                   # Database migrations
```

---

## 🔧 Common Issues and Fixes

### Issue 1: Database Connection Error
**Error:** `Failed to connect to database`

**Fix:**
```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Start PostgreSQL if not running
sudo service postgresql start

# Verify your DATABASE_URL in .env
# Make sure the username, password, and database name are correct
```

### Issue 2: Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5000`

**Fix:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change the port in .env
PORT=3000
```

### Issue 3: CORS Errors
**Error:** `Access to fetch at 'http://localhost:5000/api/flights' has been blocked by CORS policy`

**Fix:**
- This should be fixed in the updated `server/index-dev.ts` file
- Make sure you're using the latest version of the server files
- Restart the development server

### Issue 4: TypeScript Errors
**Error:** Various TypeScript compilation errors

**Fix:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Run type checking
npm run check
```

### Issue 5: Migration Errors
**Error:** `relation "flights" does not exist`

**Fix:**
```bash
# Push schema to database
npm run db:push

# Or generate and run migrations
npm run db:generate
```

---

## 📊 Database Schema

The `flights` table includes:
- `id` - Primary key (auto-increment)
- `flightNumber` - Flight identifier (e.g., "AA100")
- `airline` - Airline name
- `origin` - Departure location
- `destination` - Arrival location
- `departureTime` - Scheduled departure time
- `arrivalTime` - Scheduled arrival time
- `status` - Flight status (scheduled, boarding, departed, etc.)
- `gate` - Gate number (optional)
- `terminal` - Terminal (optional)
- `aircraft` - Aircraft type (optional)
- `notes` - Additional notes (optional)
- `createdAt` - Record creation timestamp
- `updatedAt` - Record update timestamp

---

## 🎨 Features Implemented

### Backend (Express + PostgreSQL)
- ✅ RESTful API with full CRUD operations
- ✅ Database connection with error handling
- ✅ CORS configuration
- ✅ Request logging
- ✅ Error handling middleware
- ✅ Health check endpoint
- ✅ Input validation
- ✅ TypeScript types throughout

### Frontend (React + TypeScript)
- ✅ Flight list with real-time updates
- ✅ Loading states and error handling
- ✅ Responsive design with Tailwind CSS
- ✅ Auto-refresh every 30 seconds
- ✅ Status color coding
- ✅ Time and date formatting
- ✅ Manual refresh button
- ✅ Empty state handling
- ✅ React Query for data fetching

---

## 🚦 API Endpoints

### GET /api/health
Returns server health status

### GET /api/flights
Returns all flights (sorted by departure time)

### GET /api/flights/:id
Returns a single flight by ID

### POST /api/flights
Creates a new flight
```json
{
  "flightNumber": "string",
  "airline": "string",
  "origin": "string",
  "destination": "string",
  "departureTime": "ISO8601 datetime",
  "arrivalTime": "ISO8601 datetime",
  "status": "string",
  "gate": "string (optional)",
  "terminal": "string (optional)",
  "aircraft": "string (optional)"
}
```

### PUT /api/flights/:id
Updates an existing flight

### DELETE /api/flights/:id
Deletes a flight

---

## 📝 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run check

# Push database schema
npm run db:push

# Generate database migrations
npm run db:generate

# Open Drizzle Studio (database GUI)
npm run db:studio

# Format code
npm run format
```

---

## 🎯 Next Steps

1. **Add Sample Data:** Create some test flights using the POST endpoint
2. **Customize UI:** Modify `client/src/App.tsx` to match your design
3. **Add Features:** 
   - Flight search/filter
   - Real-time notifications
   - Flight tracking maps
   - User authentication
4. **Deploy:** Consider deploying to platforms like:
   - Vercel/Netlify (frontend)
   - Railway/Render (backend + database)
   - Heroku
   - AWS/GCP/Azure

---

## 🆘 Getting Help

If you encounter issues:
1. Check the terminal output for error messages
2. Check browser console (F12) for frontend errors
3. Verify your `.env` file is configured correctly
4. Ensure PostgreSQL is running
5. Make sure all dependencies are installed
6. Try deleting `node_modules` and reinstalling

---

## ✅ Verification Checklist

- [ ] PostgreSQL is installed and running
- [ ] `.env` file is created with correct DATABASE_URL
- [ ] Dependencies installed (`npm install`)
- [ ] Database schema pushed (`npm run db:push`)
- [ ] Development server starts without errors (`npm run dev`)
- [ ] Health endpoint responds: `curl http://localhost:5000/api/health`
- [ ] Frontend loads in browser: http://localhost:5000
- [ ] No console errors in browser (F12)

---

**You're all set! 🎉** Your flight tracker app should now be running with all fixes applied.
