# Flight Tracker Application

A full-stack flight tracking application built with React, TypeScript, Express, and PostgreSQL. Track flights in real-time with a modern, responsive interface.

![Flight Tracker](https://img.shields.io/badge/version-1.1.2-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 📜 Changelog

### v1.1.2 (2025-12-22)

- **⚙️ Maintenance**
  - Updated project dependencies to address security vulnerabilities.
  - Formatted the entire codebase to ensure consistent styling.

### v1.1.1 (2024-10-25)

- **🔧 Fixes**
  - Implemented full CRUD (Create, Read, Update, Delete) functionality for flights.
  - Added a modal form for creating and editing flight records.
  - Added "Edit" and "Delete" buttons to each flight card.
  - Resolved all outstanding TypeScript errors.
  - Correctly configured the project for Vite's type definitions.
  - Cleaned up unused variables in server-side code.

## ✨ Features

- 🛫 Real-time flight tracking with auto-refresh (30-second intervals)
- ✈️ Complete CRUD operations for flight management
- 🎨 Modern, responsive UI with Tailwind CSS
- 📊 Color-coded flight status indicators
- 🔄 Automatic data synchronization
- 🚀 Fast development with Vite HMR
- 🔐 Type-safe API with TypeScript
- 💾 PostgreSQL database with Drizzle ORM
- 🎯 RESTful API architecture
- ⚡ Optimized production builds

## 📋 Prerequisites

- **Node.js** >= 18.0.0
- **PostgreSQL** >= 13.0
- **npm** or **yarn**

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
cp .env.example .env
```

Then edit `.env` with your configuration:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/flighttracker
NODE_ENV=development
PORT=5000
VITE_API_URL=http://localhost:5000
```

### 3. Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE flighttracker;

# Exit
\q
```

### 4. Set Up Database Schema

```bash
npm run db:push
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at:

- **Frontend & API:** `http://localhost:5000`
- **Health Check:** `http://localhost:5000/api/health`
- **Flights API:** `http://localhost:5000/api/flights`

## 🏗️ Build for Production

### Build the Application

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

Or with explicit environment:

```bash
NODE_ENV=production node dist/server/index-prod.js
```

## 📁 Project Structure

```
flighttrackerapp/
├── client/                      # React frontend
│   ├── src/
│   │   ├── App.tsx             # Main application component
│   │   ├── main.tsx            # Entry point with QueryClient setup
│   │   ├── index.css           # Global styles (Tailwind)
│   │   └── lib/
│   │       └── api.ts          # API client functions
│   └── index.html              # HTML template
│
├── server/                      # Express backend
│   ├── index-dev.ts            # Development server with Vite
│   ├── index-prod.ts           # Production server
│   ├── routes.ts               # API route handlers
│   └── db.ts                   # Database connection & setup
│
├── shared/                      # Shared code
│   ├── schema.ts               # Database schema (Drizzle ORM)
│   └── types.ts                # TypeScript type definitions
│
├── migrations/                  # Database migrations
├── .env                        # Environment variables (create this)
├── .env.example                # Environment template
├── vite.config.ts              # Vite configuration
├── drizzle.config.ts           # Drizzle ORM configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 📜 Available Scripts

| Command               | Description                                |
| --------------------- | ------------------------------------------ |
| `npm run dev`         | Start development server with hot reload   |
| `npm run build`       | Build for production (TypeScript + Vite)   |
| `npm start`           | Start production server                    |
| `npm run check`       | Run TypeScript type checking               |
| `npm run db:push`     | Push database schema changes to PostgreSQL |
| `npm run db:generate` | Generate database migrations               |
| `npm run db:studio`   | Open Drizzle Studio (database GUI)         |
| `npm run format`      | Format code using Prettier                 |

## 🔧 Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query** (React Query) - Server state management
- **Wouter** - Lightweight routing
- **Radix UI** - Accessible component primitives
- **Vite** - Fast build tool and dev server

### Backend

- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **Drizzle ORM** - Type-safe database toolkit
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing
- **TypeScript** - Type safety

### Development Tools

- **tsx** - TypeScript execution
- **Prettier** - Code formatting
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 🌐 API Endpoints

### Health Check

```
GET /api/health
```

Returns server health status and timestamp.

### Flights

#### Get All Flights

```
GET /api/flights
```

Returns all flights sorted by departure time.

#### Get Single Flight

```
GET /api/flights/:id
```

Returns a specific flight by ID.

#### Create Flight

```
POST /api/flights
Content-Type: application/json

{
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
}
```

#### Update Flight

```
PUT /api/flights/:id
Content-Type: application/json

{
  "status": "boarding",
  "gate": "A14"
}
```

#### Delete Flight

```
DELETE /api/flights/:id
```

## 📊 Database Schema

### Flights Table

| Column          | Type         | Description                                         |
| --------------- | ------------ | --------------------------------------------------- |
| `id`            | Serial       | Primary key (auto-increment)                        |
| `flightNumber`  | Varchar(20)  | Flight identifier (e.g., "AA100")                   |
| `airline`       | Varchar(100) | Airline name                                        |
| `origin`        | Varchar(100) | Departure location                                  |
| `destination`   | Varchar(100) | Arrival location                                    |
| `departureTime` | Timestamp    | Scheduled departure time                            |
| `arrivalTime`   | Timestamp    | Scheduled arrival time                              |
| `status`        | Varchar(50)  | Flight status (scheduled, boarding, departed, etc.) |
| `gate`          | Varchar(10)  | Gate number (optional)                              |
| `terminal`      | Varchar(10)  | Terminal (optional)                                 |
| `aircraft`      | Varchar(50)  | Aircraft type (optional)                            |
| `notes`         | Text         | Additional notes (optional)                         |
| `createdAt`     | Timestamp    | Record creation time                                |
| `updatedAt`     | Timestamp    | Last update time                                    |

### Flight Status Values

- `scheduled` - Flight is scheduled
- `boarding` - Boarding in progress
- `departed` - Flight has departed
- `in-flight` - Currently in the air
- `arrived` - Flight has arrived
- `delayed` - Flight is delayed
- `cancelled` - Flight is cancelled

## 🧪 Testing the API

### Using cURL

**Test health endpoint:**

```bash
curl http://localhost:5000/api/health
```

**Get all flights:**

```bash
curl http://localhost:5000/api/flights
```

**Create a flight:**

```bash
curl -X POST http://localhost:5000/api/flights \
  -H "Content-Type: application/json" \
  -d '{
    "flightNumber": "BA200",
    "airline": "British Airways",
    "origin": "London (LHR)",
    "destination": "Paris (CDG)",
    "departureTime": "2024-11-25T14:00:00Z",
    "arrivalTime": "2024-11-25T15:30:00Z",
    "status": "scheduled"
  }'
```

## 🐛 Troubleshooting

### Database Connection Error

```bash
# Check if PostgreSQL is running
sudo service postgresql status

# Start PostgreSQL
sudo service postgresql start

# Verify DATABASE_URL in .env
```

### Port Already in Use

```bash
# Find process on port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change PORT in .env
```

### TypeScript Errors

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Run type checking
npm run check
```

### Migration Issues

```bash
# Push schema to database
npm run db:push

# Or generate migrations
npm run db:generate
```

## 🚀 Deployment

### Recommended Platforms

**Frontend + Backend:**

- [Railway](https://railway.app)
- [Render](https://render.com)
- [Fly.io](https://fly.io)

**Frontend Only:**

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)

**Database:**

- [Neon](https://neon.tech) - Serverless PostgreSQL
- [Supabase](https://supabase.com) - PostgreSQL with extras
- [Railway](https://railway.app) - PostgreSQL instance

### Environment Variables for Production

```env
DATABASE_URL=postgresql://user:pass@host:5432/flighttracker
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-frontend-url.com
```

## 🎯 Design System

The application follows a modern dashboard design approach based on aviation industry conventions. Key design principles:

- **Clean, minimal interface** for easy scanning
- **Color-coded status indicators** for quick recognition
- **Responsive design** for all screen sizes
- **Accessible components** following ARIA guidelines
- **Real-time updates** without page refresh
- **Loading and error states** for better UX

See `design_guidelines.md` for detailed design specifications.

## 📝 Development Workflow

1. **Make changes** to code
2. **Type check:** `npm run check`
3. **Format code:** `npm run format`
4. **Test locally:** `npm run dev`
5. **Build:** `npm run build`
6. **Test production:** `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Created with ❤️ by Darshil for tracking flights efficiently.
