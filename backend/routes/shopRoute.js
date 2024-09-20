const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");
const rootMiddleware = require("../middlewares/root");
const adminMiddleware = require("../middlewares/admin");

// Create a new Shop
router.post("/", shopController.createShop);

// Get all Shops
router.get("/", shopController.getAllShops);

// Get Shop by owner ID
router.get("/owner/:ownerId", shopController.getShopByOwnerId);

// Get a single Shop by ID
router.get("/:id", shopController.getShopById);

// Update a Shop by ID
// remember to add:   rootMiddleware,   adminMiddleware,
router.put("/:id/details", shopController.updateShopDetailsById);

router.put("/:id/ui", shopController.updateShopWithNewShopUI);

// Delete a Shop by ID
router.delete(
  "/shop/:id",
  rootMiddleware,
  adminMiddleware,
  shopController.deleteShopById
);

module.exports = router;
