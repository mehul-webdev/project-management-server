const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const authenticationRoutes = require("./routes/authentication.routes");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/project-management/v1/todos", todoRoutes);
app.use("/project-management/v1/authentication", authenticationRoutes);

// Centralized error handler (must be after all routes and middleware)
app.use(errorHandler);

module.exports = app;
