const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");

// Create user (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const { email, password, userRole } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hashedPassword,
      userRole,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
});

// Get all users (Protected)
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password from response
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
});

// Get single user (Protected)
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
});

// Update user (Protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    // If password is being updated, hash it
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
});

// Update user chats (Protected)
router.put("/:id/chats", auth, async (req, res) => {
  try {
    const { chats } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { chats } },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error updating user chats",
      error: error.message,
    });
  }
});

// Delete user (Protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
});

module.exports = router;
