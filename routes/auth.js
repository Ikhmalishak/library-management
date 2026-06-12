const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

const users = []; // This should be replaced with a database in a real application

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Store the new user
    users.push({ username, password: hashedPassword });
    
    res.status(201).json({ message: 'User registered successfully' });
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Find the user
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Create a JWT
    const token = jwt.sign({ username: user.username }, 'secretKey', { expiresIn: '1h' });
    
    res.json({ token });
});

// Protected route
router.get('/protected', (req, res) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    try {
        const tokens = jwt.decode(token);
        console.log(tokens);
        const decoded = jwt.verify(token, 'secretKey');
        res.json({ message: 'Protected route', user: decoded });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;