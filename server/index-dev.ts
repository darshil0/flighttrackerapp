import "./dotenv.js";
import express from "express";
import cors from "cors";
import { createServer } from "vite";
import routes from "./routes";
import { testConnection } from "./db";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API routes
app.use(routes);

// Error handling middleware
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error("Server error:", err);
    res.status(500).json({
      error: "Internal server error",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    });
  },
);

async function startServer() {
  try {
    // Test database connection
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error(
        "Failed to connect to database. Please check your DATABASE_URL.",
      );
      process.exit(1);
    }

    // Create Vite server in middleware mode
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    // Use vite's connect instance as middleware
    app.use(vite.middlewares);

    app.listen(PORT, () => {
      console.log(`
🚀 Server started successfully!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📡 API Server:    http://localhost:${PORT}
🌐 Frontend:      http://localhost:${PORT}
📊 Health Check:  http://localhost:${PORT}/api/health
🛫 Flights API:   http://localhost:${PORT}/api/flights
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Environment: ${process.env.NODE_ENV || "development"}
`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
