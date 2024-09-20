const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const adminMiddleware = require("../middlewares/admin");

// Create a new Product
router.post("/", adminMiddleware, productController.createProduct);

// Get all Products
router.get("/", productController.getAllProducts);

// Get products by CategoryId
router.get("/category/:categoryId", productController.getProductsByCategoryId);

// Get a Product by name
router.get("/search", productController.getProductByName);

// Get products by StoreId
router.get("/store/:storeId", productController.getProductsByStoreId);

// Get a single Product by ID
router.get("/:id", productController.getProductById);

// Get average rating for a Product by ID
router.get("/average-rating/:id", productController.getProductAverageRating);

// Update a Product by ID
router.put("/:id", adminMiddleware, productController.updateProductById);

// Delete a Product by ID
router.delete("/:id", adminMiddleware, productController.deleteProductById);

module.exports = router;
