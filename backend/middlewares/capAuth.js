const capModel = require('../models/captainModel.js');
const jwt = require('jsonwebtoken');

const capAuth = async (req, res, next) => {
  try {
    let token;
    token = req.cookies.captoken;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.cap = await capModel.findById(decoded._id);
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = capAuth;