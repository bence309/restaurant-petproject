const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt'); // Added bcrypt
const { connectToDatabase } = require('./db');
const initializePassport = require('./passport');

const app = express();
const port = process.env.PORT || 3002;

initializePassport();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(async (req, res, next) => {
  req.db = await connectToDatabase();
  next();
});

// New route for the root path
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the homepage!' });
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const { db } = req;

  try {
    const User = await connectToDatabase();

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/login', passport.authenticate('local', {
  failureFlash: true, // Remove this line or set it to false
}), (req, res) => {
  // This part will be executed if authentication is successful
  console.log('User after authentication:', req.user);
  res.status(200).json({
    username: req.user.username,
    message: 'Successful login!', // Modify the success message as needed
  });
});

app.get('/dashboard', (req, res) => {
  res.json({ message: 'Welcome to the dashboard!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
