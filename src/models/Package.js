const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    businessid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    minPrice: {
      type: String,
      required: true,
    },
    maxPrice: {
      type: String,
      default: "",
    },
    availableFor: {
      type: [String],
      enum: ["men", "women"],
      required: true,
    },
    availableAt: {
      type: [String],
      enum: ["onSite"],
      required: true,
    },
    packageName: {
      type: String,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    offer: {
      type: String,
      default: "0",
      required: false,
    },
  },
  { collection: "packages" }
);

module.exports = mongoose.model("packages", packageSchema);
