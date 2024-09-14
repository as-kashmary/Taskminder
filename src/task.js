const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Subtask schema
const subtaskSchema = new Schema({
  description: {
    type: String,
    
  },
  title: {
    type: String,
    required: true
  },
  prog: {
    type: String,
    required: true
  }
});

// Define the Task schema
const taskSchema = new Schema({
  email:{
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    
  },
  prog: {
    type: String,
    required: true
  },
  subtasks: [subtaskSchema]
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
