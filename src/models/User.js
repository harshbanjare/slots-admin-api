const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    userRole: {
      type: String,
      enum: ["client", "merchant"],
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    chats: {
      type: [String],
      default: [],
      required: false,
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model("users", userSchema);
