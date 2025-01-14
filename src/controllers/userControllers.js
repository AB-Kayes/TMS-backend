const User = require('../models/User');

const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }
        
        const user = await User.create({ username, password });
        res.status(201).json({message: 'User created', user});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if(!user) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        res.status(200).json({message: 'User logged in', user});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

    module.exports = { registerUser, loginUser };