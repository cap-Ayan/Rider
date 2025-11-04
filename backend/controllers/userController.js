const userModel = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
    try {
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        console.log(name, email, password);
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name,
            email,
            password: hashedPassword,
           
        });
       

        await user.save();
        
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });

        res.status(201).json({success:true, message: 'User registered successfully', user});
    } catch (error) {
        res.status(500).json({success:false, error: 'Internal server error' });
    }
};
