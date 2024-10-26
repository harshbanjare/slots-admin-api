const router = require("express").Router();
const Business = require("../models/Business");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

// Create business
router.post("/", auth, async (req, res) => {
  try {
    // Get admin ID from auth middleware
    const userid = req.admin.adminId;

    // Validate if userid is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userid)) {
      return res.status(400).json({
        message: "Invalid admin ID format",
      });
    }

    // Create new business with admin's ID
    const business = new Business({
      ...req.body,
      userid: userid, // Set userid from authenticated admin
    });

    await business.save();
    res.status(201).json(business);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation Error",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Error creating business",
      error: error.message,
    });
  }
});

// Get all businesses
router.get("/", auth, async (req, res) => {
  try {
    const businesses = await Business.find().select({
      businessName: 1,
      city: 1,
      state: 1,
      status: 1,
      rating: 1,
      services: 1,
      gender: 1,
      currentlyWorking: 1,
      serviceOpen: 1,
      workinghourstart: 1,
      workinghourend: 1,
      bannerUrl: 1,
    });
    res.json(businesses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching businesses", error: error.message });
  }
});

// Get single business
router.get("/:id", auth, async (req, res) => {
  try {
    const business = await Business.findOne({
      _id: req.params.id,
    }).select({
      businessName: 1,
      name: 1,
      mobile: 1,
      address: 1,
      city: 1,
      state: 1,
      pinCode: 1,
      country: 1,
      services: 1,
      gender: 1,
      latitude: 1,
      longitude: 1,
      status: 1,
      rating: 1,
      currentlyWorking: 1,
      serviceOpen: 1,
      workinghourstart: 1,
      workinghourend: 1,
      bannerUrl: 1,
      certificateUrl: 1,
    });

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.json(business);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching business", error: error.message });
  }
});

// Update business
router.put("/:id", auth, async (req, res) => {
  try {
    // Remove userid from req.body if it exists to prevent unauthorized changes
    const { userid, ...updateData } = req.body;

    // Validate business exists and belongs to admin
    const existingBusiness = await Business.findById(req.params.id);
    if (!existingBusiness) {
      return res.status(404).json({ message: "Business not found" });
    }

    // Update business with sanitized data
    const business = await Business.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      {
        new: true,
        runValidators: true, // This ensures mongoose validation runs on update
      }
    );

    res.json(business);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid ID format",
        error: error.message,
      });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation Error",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Error updating business",
      error: error.message,
    });
  }
});

// Delete business
router.delete("/:id", auth, async (req, res) => {
  try {
    const business = await Business.findOneAndDelete({
      _id: req.params.id,
    });
    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }
    res.json({ message: "Business deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting business", error: error.message });
  }
});

module.exports = router;
