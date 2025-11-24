# Flight Tracker Application

A full-stack flight tracking application built with React, TypeScript, Express, and PostgreSQL.

## Prerequisites

- Node.js >= 18.0.0
- PostgreSQL database
- npm or yarn

## Setup Instructions

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and add your PostgreSQL connection string.

3. **Set up the database:**

   ```bash
   npm run db:push
   ```

4. **Run in development mode:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5000`

## Build for Production

1. **Build the application:**

   ```bash
   npm run build
   ```

2. **Start the production server:**
   ```bash
   npm start
   ```

## Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── App.tsx     # Main app component
│   │   ├── main.tsx    # Entry point
│   │   ├── index.css   # Global styles
│   │   └── lib/        # Utility functions
│   └── index.html      # HTML template
├── server/             # Express backend
│   ├── index-dev.ts    # Development server
│   ├── index-prod.ts   # Production server
│   ├── routes.ts       # API routes
│   └── vite.ts         # Vite configuration
├── shared/             # Shared types and schemas
│   └── schema.ts       # Database schema
└── migrations/         # Database migrations

```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes
- `npm run format` - Format the code using Prettier

## Code Formatting

This project uses [Prettier](https://prettier.io/) for consistent code formatting. To format the code, run the following command:

```bash
npm run format
```

## Tech Stack

### Frontend

- React 18
- TypeScript
- Tailwind CSS
- Wouter (routing)
- TanStack Query
- Radix UI components

### Backend

- Express.js
- PostgreSQL
- Drizzle ORM
- Zod validation

### Development

- Vite
- TypeScript
- ESLint
- PostCSS

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/flights` - Get all flights

## Design System

The application follows a modern dashboard design approach based on aviation industry conventions. See `design_guidelines.md` for detailed design specifications.

## License

MIT
