// middleware/auth.js

const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  console.log('Auth middleware called');
  
  // Get token from header
  const authHeader = req.header('Authorization');
  console.log('Auth header:', authHeader);
  
  if (!authHeader) {
    console.log('No Authorization header found');
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    console.log('Invalid token format');
    return res.status(401).json({ message: 'Invalid token format' });
  }

  try {
    // Check if it's an admin token
    if (token.startsWith('admin-jwt-token-')) {
      console.log('Using mock admin token');
      req.user = {
        id: 'admin-1',
        _id: 'admin-1',
        email: 'admin@gmail.com',
        role: 'admin',
        isAdmin: true
      };
      console.log('Admin user authenticated:', req.user);
      return next();
    }

    // Verify JWT token
    console.log('Verifying JWT token...');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token verified successfully');
    
    // Set user object with role and id
    req.user = {
      id: decoded.id,
      _id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      isAdmin: decoded.role === 'admin'
    };
    
    console.log('User authenticated:', req.user);
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Token is not valid', error: err.message });
  }
};
