const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    businessid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "businesses",
      required: true,
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    packageid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "packages",
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    forFriend: {
      type: Boolean,
      default: false,
    },
    friendName: {
      type: String,
      default: "",
    },
    friendMobile: {
      type: String,
      default: "",
    },
    packageCategory: {
      type: String,
      enum: ["men", "women"],
      required: true,
    },
    packageDiscount: {
      type: String,
      default: "0",
    },
    locationType: {
      type: String,
      enum: ["on-site"],
      required: true,
    },
    selectedSlot: {
      type: String,
      required: true,
    },
    selectedDate: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    clientEmail: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
    },
    paidPrice: {
      type: String,
      required: true,
    },
  },
  { collection: "appointments" }
);

module.exports = mongoose.model("appointments", appointmentSchema);
