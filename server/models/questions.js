const mongoose = require('mongoose');

// Define the schema for storing topics and their associated questions
const topicSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  questions: {
    type: [String], // Array of strings to store questions
    required: true
  }
});

// Create a model based on the schema
const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
