const mongoose = require('mongoose');

// Connection string stored securely in an environment variable
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://ask:12345678ab@cluster0.dz4ax.mongodb.net/Taskminder?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas with better handling and options
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database Connected Successfully to MongoDB Atlas");
    } catch (err) {
        console.log("Database connection failed:", err);
        process.exit(1); // Exit with failure
    }
};

// Call the function to connect to the database
connectDB();

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create the model for the 'users' collection
const User = mongoose.model("users", Loginschema);

module.exports = User;
