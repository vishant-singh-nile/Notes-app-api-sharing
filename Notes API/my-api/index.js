const express = require("express");
const connectDB = require('./Database/Connect');
// const List = require('./Models/List');
const Title = require("./Models/Title");
// const path = require('path');

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const hashedPassword = bcrypt.hashSync('secret123', 10);
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.json()); // JSON body handle karne ke liye

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const List_routes = require("./Routes/NotesList");
const verifyToken = require('./verifyToken');

const users = [
  {
    username: 'admin',
    password: hashedPassword
  }
];

// Connect to database
connectDB(process.env.MONGODB_URL); 

app.get("/", (req, res) => {
  res.send("API is working!");
});

// app.get('/Form', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'formTask.html'));
// });


// app.get('/FormTittle', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'formTittle.html'));
// });


// Dummy login route (username and password check simulation)
const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '90d' }
  );

  res.json({ token });
});


// Protected Routes (token required)  
app.use("/api/Title", verifyToken, List_routes);

// POST route
// app.post("/submit", async (req, res) => {
//   try {
//     const {   list, date, time } = req.body;
//     const newEntry = new List({ list, date, time });
//     await newEntry.save();
//     res.send("Form submitted and saved in DB!");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error saving to database.");
//   }
// });





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
