// middleware/adminMiddleware.js

const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied: Admins only' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
