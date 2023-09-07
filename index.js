const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // If you need to handle cross-origin requests
const taskRoutes = require('./src/routes/taskroutes'); // Import your task routes

const app = express();
const port = process.env.PORT || 5512; // Set the port number for your server

// Middleware
app.use(cors()); // Enable CORS if needed
app.use(bodyParser.json()); // Parse JSON request bodies

// Use your task routes
app.use('/api/tasks', taskRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});