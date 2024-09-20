const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/servicesController");
const adminMiddleware = require("../middlewares/admin");

// Create a new Service
router.post("/", adminMiddleware, serviceController.createService);

// Get services by Category ID
router.get("/category/:categoryId", serviceController.getServicesByCategoryId);

// Get a Service by name
router.get("/search", serviceController.getServiceByName);

// Get services by Store ID
router.get("/store/:storeId", serviceController.getServicesByStoreId);

// Get all Services
router.get("/", serviceController.getAllServices);

// Get a single Service by ID
router.get("/:id", serviceController.getServiceById);

// Get average rating for a service by ID
router.get("/average-rating/:id", serviceController.getServiceAverageRating);

// Update a Service by ID
router.put("/:id", adminMiddleware, serviceController.updateServiceById);

// Delete a Service by ID
router.delete("/:id", adminMiddleware, serviceController.deleteServiceById);

module.exports = router;
