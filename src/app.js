const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes");
const authenticationRoutes = require("./routes/authentication.routes");
const userRoutes = require("./routes/users.routes");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");

const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");
const { validateToken } = require("./middlewares/authorizationMiddleware");

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://fullstack-project-management.netlify.app",
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
};

app.use((req, res, next) => {
  console.log("Incoming Origin:", req.headers.origin);
  next();
});

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
// app.options("*", cors(corsOptions));

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/project-management/v1/todos", todoRoutes);
app.use("/project-management/v1/authentication", authenticationRoutes);
app.use("/project-management/v1/users", validateToken, userRoutes);
app.use("/project-management/v1/project", validateToken, projectRoutes);
app.use("/project-management/v1/task", validateToken, taskRoutes);

// Centralized error handler (must be after all routes and middleware)
app.use(errorHandler);

module.exports = app;
