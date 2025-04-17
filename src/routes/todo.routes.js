const express = require("express");
const router = express.Router();
const todoModel = require("../schemas/toDoSchema");

// Create a todo
router.post("/create-todo", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const newTask = await todoModel.create({ title, description, status });

    res.status(201).json({ message: "Todo created", data: newTask });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get all todos
router.get("/get-todos", async (req, res) => {
  try {
    const todos = await todoModel.find();
    res.status(200).json({ message: "Todos fetched", data: todos });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update a todo
router.patch("/update-todo/:id", async (req, res) => {
  try {
    const todo = await todoModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.status(200).json({ message: "Todo updated", data: todo });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a todo
router.delete("/delete-todo/:id", async (req, res) => {
  try {
    const todo = await todoModel.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.status(200).json({ message: "Todo deleted", data: todo });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
