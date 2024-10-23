const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/users'); // Adjust path as needed
app.use('/api/users', userRoutes); // Mounts the route, so /api/users/register works


// Middleware to protect routes
const protect = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = protect;
