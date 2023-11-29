const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db');

const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  req.db = await connectToDatabase();
  next();
});

app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  const { db } = req;

  try {
    
    await db.insertOne({ username, email, password });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
