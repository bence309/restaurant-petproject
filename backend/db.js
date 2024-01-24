const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // This field now stores the hashed password
});

const User = mongoose.model('User', userSchema);

async function connectToDatabase() {
  try {
    await db;
    console.log('Connected to the database');
    return User; // Return the User model directly
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

module.exports = { db, User, connectToDatabase };

