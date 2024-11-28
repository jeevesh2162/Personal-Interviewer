const mongoose = require('mongoose');

// Define the schema for interview data
const interviewSchema = new mongoose.Schema({
  user: {
    type: String, // Reference to the logged-in user
    required: true
  },
  topic:
  {
    type:String,
    required:true
    
  },
  interviewData: {
    type:[],
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create the Interview model
const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
