const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate username and password
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required." });
        }

        // Check if the username already exists in the database
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists. Please choose a different one." });
        }

        // Hash the password
        const hash = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            password: hash
        });

        const token = jwt.sign(
            {
              userId: newUser._id,
              username: newUser.username
            },
            '123456789',
            { expiresIn: '1h' }
          );

        res.status(201).json({ message: "User created successfully", user: newUser, token });
    } catch (err) {
        // Handle any unexpected errors
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate username and password
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required." });
        }

        // Find the user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: `User with username ${username} not found.` });
        }

        // Compare the password
        const isVerified = await bcrypt.compare(password, user.password);
        if (!isVerified) {
            return res.status(401).json({ error: "Incorrect Password" });
        }

        // Don't send the password in the response
        const { password: userPassword, ...userDataWithoutPassword } = user._doc;

        
        const token = jwt.sign(
            {
              userId: user._doc._id,
              username: user._doc.username
            },
            '123456789',
            { expiresIn: '1h' }
          );

        res.json({ user: userDataWithoutPassword, token });
    } catch (err) {
        // Handle any unexpected errors
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    signup,
    login
}