const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      console.log('protect: no token');
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.log('protect: jwt verify failed', err.message);
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    console.log('protect: decoded token ->', decoded);

    // find user and exclude password
    const user = await userModel.findById(decoded._id || decoded.id).select('-password');
    if (!user) {
      console.log('protect: user not found for id', decoded._id || decoded.id);
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    req.user = user;
    // log minimal user info for debugging
    console.log('protect: loaded user ->', { id: user._id, email: user.email, name: user.name });

    next();
  } catch (error) {
    console.error('protect middleware error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = protect;
