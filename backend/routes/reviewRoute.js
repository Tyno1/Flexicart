const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewsController");
const authMiddleware = require("../middlewares/auth");

// Route to create a review
router.post("/", authMiddleware, reviewController.createReview);

// Route to get reviews for a product
router.get("/product/:productId", reviewController.getReviewsForProduct);

// Route to get reviews for a service
router.get("/service/:serviceId", reviewController.getReviewsForService);

// Route to update a review
router.put("/:reviewId", authMiddleware, reviewController.updateReview);

// Route to delete a review
router.delete("/:reviewId", authMiddleware, reviewController.deleteReview);

module.exports = router;
