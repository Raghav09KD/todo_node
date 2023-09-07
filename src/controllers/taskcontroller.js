const { db } = require("../database/connection"); // Import your database connection
const Task = db.collection("tasks"); // Replace 'tasks' with the actual collection name
const { ObjectId } = require("mongodb");

const Joi = require('joi');

// Define the JSON schema for a task
const taskSchema = Joi.object({
  name: Joi.string().min(1).required(),
  category: Joi.string().min(1).required(),
  description: Joi.string().min(1).required(),
  priority: Joi.string().valid('Low', 'Medium', 'High').required(),
  duration: Joi.number().integer().min(1).required(),
});

// Controller function to add a task
exports.addTask = async (req, res) => {
  try {
    // Validate the request body against the taskSchema
    const validationResult = taskSchema.validate(req.body);

    if (validationResult.error) {
      // If validation fails, return a 400 Bad Request response with validation error details
      return res.status(400).json({ message: validationResult.error.details[0].message });
    }

    // If validation succeeds, create a new task
    const { name, category, description, priority, duration } = req.body;
    const createdTask = await Task.insertOne({
      name,
      category,
      description,
      priority,
      duration,
      createdTime: new Date(),
      isDeleted: false,
    });

    // Return a 201 Created response with the created task
    res.status(201).json({ message: "Success", createdTask });
  } catch (error) {
    console.error(error);

    // Handle unexpected errors with a 500 status code
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to update a task
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { name, category, description, priority, duration } = req.body;

    console.log("taskId==>", taskId);

    // Validate the request body against the updateTaskSchema
    const validationResult = taskSchema.validate(req.body);

    if (validationResult.error) {
      // If validation fails, return a 400 Bad Request response with validation error details
      return res.status(400).json({ message: validationResult.error.details[0].message });
    }

    // Update the task in the database
    const updatedTask = await Task.findOneAndUpdate(
      { _id: new ObjectId(taskId) },
      {
        $set: {
          name,
          category,
          description,
          priority,
          duration,
        },
      },
      { returnOriginal: false }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function to list tasks
exports.listTasks = async (req, res) => {
  try {
    const { deleted } = req.query; // You can use query parameters to filter tasks

    const filter = deleted === "true" ? {} : { isDeleted: false };
    console.log(filter);
    const tasks = await Task.find(filter).toArray();

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.taskId;

    // Retrieve the task by ID
    const task = await Task.findOne({ _id: new ObjectId(taskId) });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for soft deleting a task
exports.softDeleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    console.log(taskId);

    // Update the task to mark it as deleted
    const updatedTask = await Task.findOneAndUpdate(
      { _id: new ObjectId(taskId) },
      {
        $set: {
          isDeleted: true, // Mark the task as deleted
        },
      },
      { returnOriginal: false }
    );
    console.log("updated Task", updatedTask);
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task soft deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
