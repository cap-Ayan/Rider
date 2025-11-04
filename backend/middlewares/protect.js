
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  try {
    let token;
    token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded._id);
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = protect;
