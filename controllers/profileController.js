// controllers/profileController.js

const User = require('../models/User');

// Update user profile information
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    res.json({ message: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


exports.getUserDetails = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password'); // Exclude the password field
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Server Error', error: err.message });
    }
  };

// Upload profile picture as Base64 string
exports.uploadProfilePicture = async (req, res) => {
  try {
    const { base64Image } = req.body; // Expecting Base64 string in request body

    if (!base64Image) {
      return res.status(400).json({ message: 'No image provided' });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profilePicture = base64Image;
    await user.save();

    res.json({ message: 'Profile picture updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
