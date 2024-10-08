const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get categories by store ID
router.get(
  "/store/:storeId",
  categoryController.getCategoriesByStoreId
);

// Get category by ID
router.get("/:id", categoryController.getCategoryById);

// Create a new category
router.post("/", categoryController.createCategory);

// Update a category by ID
router.put("/:id", categoryController.updateCategory);

// Delete a category by ID
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
