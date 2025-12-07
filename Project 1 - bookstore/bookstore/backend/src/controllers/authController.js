const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Helper: JWT generate
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // basic check
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // already user irukana check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    // password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // new user create
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // token generate
    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // user find pannalam
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password" });
    }

    // password compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/auth/me  (protected)
const getMe = async (req, res) => {
  try {
    // authMiddleware la set pannuvom
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Get profile error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
