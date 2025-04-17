const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes");
const authenticationRoutes = require("./routes/authentication.routes");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const corsOptions = {
  origin: "https://fullstack-project-management.netlify.app/",
  credentials: true,
};

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use("/project-management/v1/todos", todoRoutes);
app.use("/project-management/v1/authentication", authenticationRoutes);

// Centralized error handler (must be after all routes and middleware)
app.use(errorHandler);

module.exports = app;
