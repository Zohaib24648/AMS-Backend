// routes/Common/authRoutes.js

const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {registerSchema,loginSchema} = require("../utils/authValidation") 
const { hashPassword, comparePassword, generateToken } = require("../utils/authUtils");


router.post("/register", async (req, res) => {
    try {
      // Validate the request body
      const { error } = registerSchema.validate(req.body);
      if (error) return res.status(400).json({ msg: error.details[0].message });
  
      const { email, password, name, role } = req.body;
  
      // Convert email to lowercase
      const normalizedEmail = email.toLowerCase();
  
      // Check if email already exists
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(409).json({ msg: "Email is already in use." });
      }
  
      // Hash the password
      const hashedPassword = await hashPassword(password);
  
      // Create the new user
      const newUser = await User.create({
        email: normalizedEmail,
        password: hashedPassword,
        name,
        role,
        createdBy: normalizedEmail,
        updatedBy: normalizedEmail
      });
  
      // Send successful response
      return res.status(201).json({ msg: "Registration successful", user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Internal server error", details: error.message });
    }
  });


  router.post("/login", async (req, res) => {
    try {
      // Validate the request body
      const { error } = loginSchema.validate(req.body);
      if (error) return res.status(400).json({ msg: error.details[0].message });
  
      const { email, password, role } = req.body;
  
     normalizedemail = email.toLowerCase();
  
      // Find user by email or ERP
      const user = await User.findOne({ email: normalizedemail });
      if (!user) {
        return res.status(404).json({ msg: "User not found." });
      }
  
      // Check password
      const isPasswordCorrect = await comparePassword(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ msg: "Incorrect password." });
      }
  
      // Check role
    //   if (role && user.role !== role) {
    //     return res.status(403).json({ msg: `User does not have ${role} privileges.` });
    //   }
  
      // Generate token
      const token = generateToken(user);
  
      // Send response excluding password
      const { password: _, ...userWithoutPassword } = user.toObject();
      res.json({ msg: "Logged in", token, user: userWithoutPassword });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ msg: "Internal server error", details: error.message });
    }
  });



module.exports = router; // Export the router to be used in server.js
