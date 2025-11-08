const capModel = require('../models/captainModel');
const jwt = require('jsonwebtoken');

const capAuth = async (req, res, next) => {
  try {
    let token;
    token = req.cookies.captoken;
    console.log('capAuth token:', token);
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('capAuth decoded:', decoded);
    const cap = await capModel.findById(decoded.id);
    console.log('capAuth cap:', cap);
    req.cap = cap;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = capAuth;