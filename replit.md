# SkyTracker - Real-Time Flight Tracking Application

## Overview

SkyTracker is a real-time flight tracking web application that provides users with interactive maps, live flight status updates, airport departure/arrival boards, and comprehensive flight information. The application delivers aviation data through an intuitive dashboard interface inspired by professional flight tracking platforms like Flightradar24 and FlightAware.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**

- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing (single-page application architecture)
- Path aliases configured for clean imports (`@/`, `@shared/`, `@assets/`)

**UI Component Library**

- shadcn/ui component system with Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom theme system supporting light/dark modes with CSS variables
- Typography uses Inter/geometric sans-serif fonts for optimal readability
- Component variant system using class-variance-authority (CVA)

**State Management & Data Fetching**

- TanStack Query (React Query) for server state management
- Custom query client with automatic error handling and retry logic
- No client-side auth state (401 handling configured but returns null)
- Infinite stale time and disabled refetching on window focus for performance

**Mapping & Visualization**

- Leaflet.js for interactive map rendering with custom aviation tile layers
- Custom flight markers using SVG plane icons with real-time position updates
- Flight path polylines with directional indicators
- Smooth map transitions and animations for tracking selected flights

**Design System**

- System-based approach following modern dashboard patterns
- 12-column grid layout system on desktop (8 columns for map, 4 for sidebar)
- Responsive breakpoints: mobile (single column), tablet (2 columns), desktop (3 columns)
- Spacing primitives based on Tailwind units (2, 4, 6, 8)
- Fixed header with backdrop blur for navigation
- Card-based layout with consistent elevation and shadows

### Backend Architecture

**Server Framework**

- Express.js with TypeScript running on Node.js
- Dual-mode server setup: development (with Vite middleware) and production (static file serving)
- Custom logging middleware for request/response tracking
- JSON body parsing with raw body preservation for webhooks

**API Structure**

- RESTful API endpoints under `/api` prefix
- Routes:
  - `GET /api/flights` - Retrieve all flights
  - `GET /api/flights/:id` - Get specific flight by ID
  - `GET /api/airports` - Retrieve all airports
  - `GET /api/airports/:code` - Get airport by code
- Consistent error handling with appropriate HTTP status codes

**Data Layer**

- Abstract storage interface (IStorage) for data operations
- In-memory storage implementation (MemStorage) with seeded mock data
- Deterministic ID generation for reproducible test data
- Prepared for database integration via interface pattern

**Development Setup**

- Hot module replacement in development via Vite integration
- Build process: Vite for client, esbuild for server bundling
- ESM module format throughout the codebase
- Source maps enabled for debugging

### Data Storage Solutions

**Database Schema (Drizzle ORM)**

- PostgreSQL as the target database (configured but not actively used)
- Two main tables defined:
  - `flights`: Stores flight information (number, airline, aircraft, route, position, status, gates)
  - `airports`: Stores airport data (code, name, location, coordinates)
- Drizzle Kit for schema management and migrations
- Zod schemas for runtime validation derived from database schema

**Connection Strategy**

- Neon serverless PostgreSQL configured via DATABASE_URL environment variable
- Schema located in `shared/schema.ts` for isomorphic access
- Migration files output to `./migrations` directory
- Currently using in-memory storage with migration path ready

### Authentication and Authorization

**Current Implementation**

- No authentication system implemented
- API endpoints are publicly accessible
- Session middleware prepared (connect-pg-simple) but not active
- 401 handling configured in query client (returns null instead of throwing)

**Prepared Infrastructure**

- Express session support ready for implementation
- PostgreSQL session store configured
- Query client configured to handle unauthorized responses

### External Dependencies

**UI & Component Libraries**

- Radix UI: Complete set of accessible, unstyled component primitives (accordion, dialog, dropdown, popover, tabs, tooltip, etc.)
- shadcn/ui: Pre-styled component patterns built on Radix UI
- Lucide React: Icon library for consistent iconography
- CMDK: Command palette component for advanced search functionality

**Data & Forms**

- TanStack Query v5: Server state management and caching
- React Hook Form: Form state management and validation
- Zod: Schema validation for forms and API responses
- date-fns: Date manipulation and formatting

**Mapping**

- Leaflet: Open-source JavaScript library for interactive maps
- @types/leaflet: TypeScript definitions

**Database & ORM**

- Drizzle ORM: TypeScript ORM for PostgreSQL
- @neondatabase/serverless: Serverless PostgreSQL driver
- drizzle-zod: Generate Zod schemas from Drizzle tables
- connect-pg-simple: PostgreSQL session store for Express

**Development Tools**

- Vite: Build tool and dev server
- TypeScript: Type safety across the stack
- Tailwind CSS: Utility-first CSS framework
- PostCSS with Autoprefixer: CSS processing
- tsx: TypeScript execution for development
- esbuild: Fast JavaScript bundler for production builds

**Replit-Specific**

- @replit/vite-plugin-runtime-error-modal: Development error overlay
- @replit/vite-plugin-cartographer: Code navigation
- @replit/vite-plugin-dev-banner: Development environment indicator

**Flight Data**

- Currently using seeded deterministic mock data
- Ready for integration with real-time flight tracking APIs
- Data structure supports: position tracking, status updates, airline information, gate/terminal assignments
