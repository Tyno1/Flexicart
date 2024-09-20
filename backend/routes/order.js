const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/auth");

// Get all orders
router.get("/", orderController.getAllOrders);

// Create a new order
router.post("/", authMiddleware, orderController.createOrder);

// Get all orders for a shop
router.get("/shop/:shopId", orderController.getOrdersByShopId);

// Get a specific order
router.get("/:id", orderController.getOrderById);

// find order by userId
router.get("/user/:userId", authMiddleware, orderController.findByUserId);

// Delete a specific order
router.delete("/:id", authMiddleware, orderController.deleteOrderById);



module.exports = router;
