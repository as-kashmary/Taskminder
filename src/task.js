const mongoose = require('mongoose');
const { Schema } = mongoose;

// MongoDB Atlas connection string
const connect = mongoose.connect("mongodb+srv://ask:12345678ab@cluster0.dz4ax.mongodb.net/Taskminder?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Check if the database is connected or not
connect.then(() => {
    console.log("Database Connected Successfully to MongoDB Atlas");
})
.catch((err) => {
    console.log("Database cannot be connected:", err);
});

// Define the Subtask schema
const subtaskSchema = new Schema({
  description: {
    type: String,
  },
  title: {
    type: String,
    required: true
  }
});

// Define the Task schema
const taskSchema = new Schema({
  email: {
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
  subtasks: [subtaskSchema]
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
