const router = require("express").Router();
const Category = require("../models/Category");
const auth = require("../middleware/auth");

// Create category (Protected)
router.post("/", auth, async (req, res) => {
  try {
    const { name, image } = req.body;

    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = new Category({
      name,
      image,
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating category", error: error.message });
  }
});

// Get all categories (Public)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching categories", error: error.message });
  }
});

// Get single category (Public)
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching category", error: error.message });
  }
});

// Update category (Protected)
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, image } = req.body;

    // Check if new name already exists (excluding current category)
    if (name) {
      const existingCategory = await Category.findOne({
        name,
        _id: { $ne: req.params.id },
      });
      if (existingCategory) {
        return res
          .status(400)
          .json({ message: "Category name already exists" });
      }
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, image },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating category", error: error.message });
  }
});

// Delete category (Protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting category", error: error.message });
  }
});

module.exports = router;
