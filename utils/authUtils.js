const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const securityKey = 'ZohaibMughal'; 

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (inputPassword, hashedPassword) => {
  return await bcrypt.compare(inputPassword, hashedPassword);
};

const generateToken = (user) => {
  return jwt.sign({
    id: user._id,
    email: user.email,
    role: user.role
  }, securityKey, { expiresIn: "10d" });
};

module.exports = { hashPassword, comparePassword, generateToken };
