const express = require("express");
const router = express.Router();
const appDataController = require("../controllers/appDataController");
const rootMiddleware = require("../middlewares/root");
const adminMiddleware = require("../middlewares/admin");

// Create a new AppData entry
router.post("/", appDataController.createAppData);

// Get all AppData entries
router.get("/", adminMiddleware, appDataController.getAllAppData);

// Get AppData by OwnerId
router.get("/user/:ownerId", appDataController.getAppDataByOwnerId);

// Get a single AppData entry by ID
router.get("/:id", appDataController.getAppDataById);

// Update an AppData entry by ID
router.put("/:id", adminMiddleware, appDataController.updateAppDataById);

// Delete an AppData entry by ID
router.delete("/:id", adminMiddleware, appDataController.deleteAppDataById);

// Delete image from the AppData
router.delete(
  "/:id/image/:bannerIndex",
  adminMiddleware,
  appDataController.deleteImageFromAppDataById
);

module.exports = router;
