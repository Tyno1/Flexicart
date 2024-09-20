const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const adminMiddleware = require("../middlewares/admin");

// Create a new Cart
router.post("/", cartController.createCart);

// Get all Carts
router.get("/", cartController.getAllCarts);

// Get a single Cart by ID
router.get("/:id", cartController.getCartById);

router.get("/user/:userId", cartController.getCartByUserId);

// Update a Cart by ID
router.put("/:id", cartController.updateCartById);

// remove cart Item by Id
router.put("/:id/remove", cartController.removeCartItemtById);

// Delete a Cart by ID
router.delete("/:id", cartController.deleteCartById);

module.exports = router;
