const Category = require("../models/category");
const { imageUploader } = require("../utils");

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategoriesByStoreId = async (req, res) => {
  const { storeId } = req.params;
  try {
    const categories = await Category.find({ shopId: storeId });
    if (categories.length > 0) {
      res.status(200).json(categories);
    } else {
      res.status(404).json({ message: "No categories found for this store" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  const { name, description, image, shopId, type } = req.body;
  try {
    let category = { name, description, shopId, type };
    let response = await imageUploader(category, image, "image");

    const newCategory = new Category(response);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a category by ID
exports.updateCategory = async (req, res) => {
  const { name, description, image, type } = req.body;
  try {
    let response = await imageUploader(req.body, image, "image");
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      response,
      { new: true }
    );
    if (updatedCategory) {
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (deletedCategory) {
      res.status(200).json({ message: "Category deleted" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
