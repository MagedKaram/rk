const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Routes
const unitsRouter = require("./routes/units");
const projectsRouter = require("./routes/projects");
const developersRouter = require("./routes/developers");
const areasRouter = require("./routes/areas");
const typesRouter = require("./routes/types");
const searchRouter = require("./routes/search");

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.FRONTEND_URL || "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        origin.includes("vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(express.json());

// API Routes
app.use("/api/units", unitsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/developers", developersRouter);
app.use("/api/areas", areasRouter);
app.use("/api/types", typesRouter);
app.use("/api/search", searchRouter);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// API Info
app.get("/api", (req, res) => {
  res.json({
    name: "REDWW Real Estate API",
    version: "1.0.0",
    endpoints: {
      units: "/api/units",
      projects: "/api/projects",
      developers: "/api/developers",
      areas: "/api/areas",
      types: "/api/types",
      search: "/api/search",
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.path,
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}/api`);
  console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
});
