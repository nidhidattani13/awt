// middleware/auth.js

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      throw new Error('No token, authorization denied');
    }

    // Extract token
    const token = authHeader.replace('Bearer ', '').trim();
    
    if (!token) {
      throw new Error('Invalid token format');
    }

    // First check if it's a mock admin token
    if (token.startsWith('admin-jwt-token-')) {
      // Validate admin token format
      const timestamp = parseInt(token.replace('admin-jwt-token-', ''));
      if (isNaN(timestamp)) {
        throw new Error('Invalid admin token format');
      }
      
      req.user = {
        id: 'admin-1',
        _id: 'admin-1',
        email: 'admin@gmail.com',
        role: 'admin',
        isAdmin: true
      };
      return next();
    }

    // If not mock admin token, verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Ensure user object has role and admin status
    req.user = {
      ...decoded,
      role: decoded.role || 'user',
      isAdmin: decoded.role === 'admin'
    };
    
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ 
      message: 'Token is not valid',
      error: err.message 
    });
  }
};
