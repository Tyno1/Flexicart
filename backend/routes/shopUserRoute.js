const express = require("express");
const router = express.Router();
const shopUserController = require("../controllers/shopUserController");
const adminMiddleware = require("../middlewares/admin");

// Create a new ShopUser
router.post("/", shopUserController.createShopUser);

// Get all ShopUsers
router.get("/", shopUserController.getAllShopUsers);

// Get a single ShopUser by ID
router.get("/:id", shopUserController.getShopUserById);

// Route to get all users for a particular shop
router.get('/:shopId/users', shopUserController.getAllUsersForShop);

// Update a ShopUser by ID
router.put("/:id", adminMiddleware, shopUserController.updateShopUserById);

// Delete a ShopUser by ID
router.delete("/:id", adminMiddleware, shopUserController.deleteShopUserById);

module.exports = router;
