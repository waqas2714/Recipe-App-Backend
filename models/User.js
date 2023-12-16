const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "This username has already been taken."] // Ensures usernames are unique
  },
  password: {
    type: String,
    required: true
  },
  isUser : {
    type: Boolean,
    required: true,
    default: true
  }
});

// Create the User model using the defined schema
const User = mongoose.model('User', userSchema);

module.exports = User; // Export the User model to use in other parts of your application
