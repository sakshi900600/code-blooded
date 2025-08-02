// src/api/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user information to the request
      req.user = decoded.user;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ msg: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Not authorized as an Admin' });
  }
};

const agent = (req, res, next) => {
  if (req.user && (req.user.role === 'Support Agent' || req.user.role === 'Admin')) {
    next();
  } else {
    res.status(403).json({ msg: 'Not authorized as a Support Agent or Admin' });
  }
};

module.exports = { protect, admin, agent };