const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

const cookieParser = require("cookie-parser");
require('dotenv').config();

const app = express();
app.use(cookieParser());

// Connect to the MongoDB database
connectDB();

// Middleware
app.use(express.json()); // Parses JSON request bodies
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend URL
  credentials: true  // Allow sending and receiving cookies
}));

// Use the user routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
