import { validationResult } from "express-validator";
import { User, GoogleUser } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Generate JWT Token
export const generateToken = (userEmail) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY environment variable missing");
    }
    
    return jwt.sign(
      { subject: userEmail },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
  } catch (error) {
    console.error("Token generation error:", error);
    throw error;
  }
};

// Sign In Method
export const signIn = async (request, response) => {
  try {
    const { email, password } = request.body;
    const errors = validationResult(request);
    
    if (!errors.isEmpty()) {
      return response.status(400).json({ 
        error: "Invalid data", 
        details: errors.array() 
      });
    }

    // Find user
    const user = await User.findOne({ email });
    const googleUser = await GoogleUser.findOne({ email });

    // Check for Google user
    if (googleUser) {
      return response.status(403).json({
        error: "Please use Google Login instead of password login"
      });
    }

    if (!user) {
      return response.status(404).json({ error: "Email not found" });
    }

    // Verify password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return response.status(401).json({ error: "Invalid password" });
    }

    // Generate token
    const token = generateToken(user.email);

    return response.status(200).json({
      message: "Login successful",
      user: {
        email: user.email,
        id: user._id
      },
      token
    });

  } catch (err) {
    console.error("Sign-in error:", err);
    return response.status(500).json({ 
      error: "Internal server error" 
    });
  }
};

// Sign Up Method
export const signUp = async (request, response) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({
        error: "Invalid data",
        details: errors.array()
      });
    }

    const { password, email, googleId, displayName } = request.body;

    // Google Signup
    if (googleId) {
      const existingUser = await GoogleUser.findOne({ googleId });
      
      if (existingUser) {
        return response.status(409).json({ 
          message: "User already exists" 
        });
      }

      const newUser = await GoogleUser.create({
        googleId,
        displayName,
        email
      });

      return response.status(201).json({
        message: "Google user created",
        user: {
          id: newUser._id,
          email: newUser.email,
          displayName: newUser.displayName
        }
      });
    }

    // Regular Signup
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(409).json({ 
        error: "Email already registered" 
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword
    });

    return response.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email
      }
    });

  } catch (err) {
    console.error("Sign-up error:", err);
    return response.status(500).json({ 
      error: "Internal server error" 
    });
  }
};