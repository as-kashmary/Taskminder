const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
app.use(express.json());
// Static file
app.use(express.static("views"));
app.use(express.static("img"));
app.use(express.static("js"));
app.use(session({
    secret: 'kashmary', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure: true in production if using HTTPS
}));

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");


app.get('/', (req, res) => {
    res.render("index", { user: req.session.user });
});
app.get('/home', (req, res) => {
    res.render("index", { user: req.session.user });
});
app.get("/signup", (req, res) => {
    res.render("signup");
});
app.get("/signin", (req, res) => {
    res.render("signin");
});
app.get('/about', (req, res) => {
    res.render("about", { user: req.session.user });
});

app.get("/calender", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/signin");
    }
    //console.log('User data saved to session:', req.session.user);
    res.render("calender", { user: req.session.user });
});
app.get("/contact%20us", (req, res) => {
    res.render("contact us", { user: req.session.user });
});
app.get('/feature', (req, res) => {
    res.render("feature", { user: req.session.user });
});
app.get('/task', (req, res) => {
    if (!req.session.user) {
        return res.redirect("/signin");
    }
    //console.log('User data saved to session:', req.session.user);
    const taskdate = req.query.date;
    const user1 = req.session.user;
    res.render("task", { taskdate,user1 });
});
app.get('/task_des', (req, res) => {
    const taskdate = req.query.taskdate;
    res.render("task_des",{taskdate});
});

// Register User
app.post("/signup", async (req, res) => {

    const data = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    
    
    //Check if the username already exists in the database
    const existingUser = await collection.findOne({ email: data.email });

    if (existingUser) {
        res.send('User already exists. Please choose a different email.');
    } else {
        //Hash the password using bcrypt
        const saltRounds = 10; // Number of salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; // Replace the original password with the hashed one

        const userdata = await collection.insertMany(data);
        //console.log(userdata);
        return res.redirect("/");
    }

});

// Login user 
app.post("/signin", async (req, res) => {
    try {
        const check = await collection.findOne({ email: req.body.email });
        if (!check) {
            return res.send("User not found")
        }
        // Compare the hashed password from the database with the plaintext password
        const isPasswordMatch = await req.body.password;
        //const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            res.send("wrong Password");
        }
        else {
            req.session.user = check; // Store user data in session
            //console.log('User data saved to session:', req.session.user);
            return res.redirect("/");
        }
    }
    catch {
        res.send("wrong Details");
    }
});
app.get("/profile", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/signin");
    }
    //console.log('User data saved to session:', req.session.user);
    res.render("userdash", { user: req.session.user });
});
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Failed to logout');
    }
    res.clearCookie('connect.sid');
    res.send('Logged out');
  });
});



// Define Port for Application
const port = 5000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
