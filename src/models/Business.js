const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    services: {
      type: [String],
      required: true,
    },
    gender: {
      type: [String],
      enum: ["men", "women"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    bannerUrl: {
      type: String,
      required: true,
    },
    certificateUrl: {
      type: String,
      required: true,
    },
    serviceOpen: {
      type: Boolean,
      default: true,
    },
    currentlyWorking: {
      type: Boolean,
      default: true,
    },
    workinghourstart: {
      type: String,
      required: true,
    },
    workinghourend: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
  },
  { collection: "businesses" }
);

const Business = mongoose.model("businesses", businessSchema);
module.exports = Business;
