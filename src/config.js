const mongoose = require('mongoose');

// Using the provided MongoDB Atlas connection string
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

// Collection part
const collection = mongoose.model("users", Loginschema);

module.exports = collection;
