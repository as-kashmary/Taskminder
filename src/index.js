const express = require("express");
const path = require("path");
const collection = require("./config");
const Task = require("./task");
const bcrypt = require('bcryptjs');
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

app.get("/calender", async(req, res) => {
    if (!req.session.user) {
        return res.redirect("/signin");
    }
    try {
        const tasks = await Task.find({ email:req.session.user.email});
        const eventsArr = [];
        tasks.forEach(task => {
            // Convert task.date string to Date object
            const taskDate = task.date;
            const [day, monthName, year] = taskDate.split(' ');

            // Step 2: Create a mapping from month names to month numbers
            const monthMapping = {
            January: 1,
            February: 2,
            March: 3,
            April: 4,
            May: 5,
            June: 6,
            July: 7,
            August: 8,
            September: 9,
            October: 10,
            November: 11,
            December: 12
            };
            // Extract day, month, year from Date object
            
            const month = monthMapping[monthName]; // Months are zero-indexed, so add 1
            
            
            // Create event object for eventsArr
            const event = {
                day: Number(day),
                month: month,
                year: Number(year),
                events: [
                {
                    title: task.title,
                    
                }
                ]
            };
        
            eventsArr.push(event);
           
        });
        //console.log(eventsArr);
        res.render("calender", {  user: req.session.user,eventsArr });
                
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading tasks');
    }
    //console.log('User data saved to session:', req.session.user);
    
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
app.post('/save-task', async (req, res) => {
    const { taskdate, tasks } = req.body;
    //console.log(req.body);
    // const taskdate= req.body.taskdate;
    // const tasks= req.body.tasks;
    // Validate the input
    if (taskdate===null || Array.isArray(tasks)===null) {
        
        return res.status(400).send('Invalid task data');
    }

    // Validate session user
    if (!req.session.user || !req.session.user.email) {
        return res.status(401).send('Unauthorized');
    }

    try {
        // Log tasks for debugging purposes
        //console.log('Tasks:', tasks);

        // Delete existing tasks for the given date
        await Task.deleteMany({ date: taskdate });

        // Prepare the new tasks for insertion
        const newTasks = tasks.map(task => ({
            email: req.session.user.email,
            date: taskdate,
            title: task.content,
            description:  "", // Use provided description or default to an empty string,
            prog: task.prog,
            subtasks: task.subtasks ? task.subtasks.map(subtask => ({
                title: subtask.content,
                description:  "",// Use provided description or default to an empty string
                prog: subtask.prog
            })) : []
        }));

        // Insert the new tasks in a single bulk operation
        await Task.insertMany(newTasks);

        res.status(200).send('Tasks saved successfully');
    } catch (err) {
        console.error('Error saving tasks to MongoDB:', err);
        res.status(500).send('Error saving tasks');
    }
});
app.get('/load-tasks', async (req, res) => {
    const taskdate = req.query.date;

    try {
        const tasks = await Task.find({ email:req.session.user.email ,date: taskdate });
        //const tasks = await Task.find({ email: req.session.user.email, date: taskdate });

        // Loop through each task and log its subtasks
        // tasks.forEach(task => {
        //     console.log(task.subtasks);
        // });

        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading tasks');
    }
});
app.get('/task_des', async(req, res) => {
    const taskdate = req.query.taskdate;
    const parentTitle=req.query.dtitle;
    const title=req.query.title;
    const k=req.query.k;
    const task = await Task.findOne({date: taskdate, title: parentTitle ,email:req.session.user.email });
    
    try{
        console.log("Title is:", title, typeof title);
        if (k=="1") {
            //console.log("Subtask is passing");
            const subtask = task.subtasks.find(st => st.title === title);
            const des=subtask.description;      
            //console.log(parentTitle+" "+title+" "+des);

            res.render("task_des",{taskdate,parentTitle,title,des});
        }else{
            //console.log("task is passing");
            const des=task.description;
            //console.log(des);
            //
            res.render("task_des",{taskdate,parentTitle,title,des});
        }
    }catch(err){
        
    }
});

// Example Express.js route
app.post('/update-task', async (req, res) => {
    const { dtitle,date,title,utitle,udescription } = req.body;
    console.log(req.body);
    try {
        if (title != 'null') {
        // Update subtask
        console.log('subtask is working');
        const task = await Task.findOne({date: date, title: dtitle ,email:req.session.user.email });
        if (task) {
            const subtask = task.subtasks.find(st => st.title === title);
            if (subtask) {
                subtask.title = utitle;
                subtask.description = udescription;
                await task.save();
                return res.status(200).send('');
            }
        }
        return res.status(404).send('Subtask not found');
        } else {
        // Update main task
        console.log('task is done for');
        const task = await Task.findOne({ date: date, title: dtitle ,email:req.session.user.email });
        if (task) {
            task.title = utitle;
            task.description = udescription;
            await task.save();
            return res.status(200).send('');
        }
        return res.status(404).send('Task not found');
        }
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).send('Internal server error');
    }
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
app.get("/profile", async(req, res) => {
    if (!req.session.user) {
        return res.redirect("/signin");
    }
    let ct=0,it=0;
    //console.log('User data saved to session:', req.session.user);
    const tasks = await Task.find({ email: req.session.user.email });
    console.log(tasks);
    tasks.forEach(task => {
        if (task ) {
            if(task.prog==="Done"){
                ct++;
            }else{
                it++;
            }
            //return res.status(200).send('Task updated successfully');
            //console.log(ct+" "+it);
        }
    });              
         //console.log("ct type:", typeof ct, "it type:", typeof it);
    res.render("userdash", { user: req.session.user ,ct:ct,it:it });
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
