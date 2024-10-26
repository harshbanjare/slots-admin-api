const router = require("express").Router();
const Package = require("../models/Package");
const auth = require("../middleware/auth");

// Create package (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const package = new Package(req.body);
    await package.save();
    res.status(201).json(package);
  } catch (error) {
    res.status(500).json({
      message: "Error creating package",
      error: error.message,
    });
  }
});

// Get all packages for a business (Public)
router.get("/business/:businessId", async (req, res) => {
  console.log(req.params.businessId);
  try {
    const packages = await Package.find({
      businessid: req.params.businessId,
      status: true,
    });
    res.json(packages);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching packages",
      error: error.message,
    });
  }
});

// Get single package (Public)
router.get("/:id", async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(package);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching package",
      error: error.message,
    });
  }
});

// Update package (Protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(updatedPackage);
  } catch (error) {
    res.status(500).json({
      message: "Error updating package",
      error: error.message,
    });
  }
});

// Delete package (Protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const package = await Package.findByIdAndDelete(req.params.id);
    if (!package) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting package",
      error: error.message,
    });
  }
});

module.exports = router;
