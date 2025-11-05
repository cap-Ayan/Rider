const captainModel = require('../models/captainModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, vehicle } = req.body;

        // Check if captain already exists
        let captain = await captainModel.findOne({ email });
        if (captain) {
            return res.status(400).json({ message: 'Captain already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new captain
        captain = new captainModel({
            name,
            email,
            password: hashedPassword,
            vehicle: {
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                type: vehicle.type
            }
        });

        await captain.save();

        // Generate JWT
        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, { expiresIn: '10h' });
        res.cookie('captoken', token, { httpOnly: true });

        res.status(201).json({ success:true, message: 'Captain registered successfully', captain });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Check if captain exists
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, captain.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT 
        const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, { expiresIn: '10h' });
        res.cookie('captoken', token, { httpOnly: true });

        res.status(200).json({ success:true, message: 'Captain logged in successfully', captain });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('captoken');
    res.status(200).json({ success:true, message: 'Captain logged out successfully' });
}
