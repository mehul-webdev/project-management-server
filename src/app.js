const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes");
const authenticationRoutes = require("./routes/authentication.routes");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    // Ensure that the request comes from a trusted source
    if (
      !origin ||
      [
        "http://localhost:3000",
        "https://fullstack-project-management.netlify.app",
      ].includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"), false);
    }
  },
  credentials: true, // Allow cookies and credentials with the request
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow only specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow the specified headers
};

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Routes
app.use("/project-management/v1/todos", todoRoutes);
app.use("/project-management/v1/authentication", authenticationRoutes);

// Centralized error handler (must be after all routes and middleware)
app.use(errorHandler);

module.exports = app;
