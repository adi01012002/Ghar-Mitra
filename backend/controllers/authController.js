

// //ahsbsg@gmail.com
// // aditya0101


// Function to generate JWT
const generateToken = (id,role) => {
  try {
    return jwt.sign({ id,role }, process.env.JWT_SECRET, { expiresIn: "30d" });
  } catch (error) {
    throw new Error("Error generating token");
  }
};

// Register User
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import crypto from "crypto";
import { sendOtpEmail } from "../utils/mailer.js"; // Use mailer utility for sending emails

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    console.log(req.body)

    // Validate fields
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Generate 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
      role,
      otp,
      otpExpiry
    });

    // Save user to the database
    await newUser.save();
    let userCreated = true;

    // Send OTP email
    const emailSent = await sendOtpEmail(email, otp);
    if (!emailSent && userCreated) {
      // If email fails, delete the user to prevent unverified accounts
      await User.deleteOne({ email });
      console.error(`OTP email sending failed for ${email} (role: ${role}) during registration.`);
      return res.status(500).json({ message: 'Failed to send OTP email. Please try registering again later.' });
    }

    console.log(`Registration successful for ${email} (role: ${role}). OTP sent.`);
    res.status(201).json({
      message: 'Registration successful. Please verify your email with the OTP sent to your email.'
    });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error (e.g., unique email constraint)
      return res.status(400).json({ message: "Duplicate username or email" });
    }
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// OTP Email Verification
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    if (user.verified) {
      return res.status(400).json({ message: "User already verified." });
    }
    if (user.otp !== otp || !user.otpExpiry || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }
    user.verified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();
    res.json({ message: "Email verified successfully. You can now login." });
  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user with that email" });
    }
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    const resetUrl = `https://ghar-mitra.onrender.com/reset-password/${token}`; // Adjust frontend URL if needed
    await sendOtpEmail(user.email, resetUrl); // Reusing your mail utility
    res.json({ message: "Password reset link sent to your email." });
  } catch (err) {
    res.status(500).json({ message: "Error sending reset email", error: err.message });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Error resetting password", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    // console.log(req.body)

    // Validate fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the password matches
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user._id,user.role);

    // Respond with user data and token
    res.json({
      _id: user._id,
      username: user.username,
      role:user.role,
      email: user.email,
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
