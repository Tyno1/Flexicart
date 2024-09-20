const Review = require("../models/review");


exports.createReview = async (req, res) => {
  try {
    const { product, service, rating, comment } = req.body;
    const user = req.user?.userId;


    // Ensure the user is authenticated
    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Validate input: Only one of product or service should be provided
    if ((product && service) || (!product && !service)) {
      return res.status(400).json({
        message:
          "A review must be for either a product or a service, not both.",
      });
    }

    // Validate input: Rating is required
    if (!rating) {
      return res.status(400).json({ message: "A review must have a rating." });
    }

    // Create and save the review
    const review = new Review({
      product,
      service,
      user,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Review added successfully", review });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add review", error: error.message });
  }
};

exports.getReviewsForProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "name"
    );
    const shopId = req.headers["x-shop-id"];


    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reviews", error });
  }
};

exports.getReviewsForService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const reviews = await Review.find({ service: serviceId }).populate(
      "user",
      "name"
    );
    const shopId = req.headers["x-shop-id"];


    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve reviews", error });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const shopId = req.headers["x-shop-id"];


    const review = await Review.findById(reviewId);

    if (review.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this review" });
    }

    review.rating = rating;
    review.comment = comment;

    await review.save();
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Failed to update review", error });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const shopId = req.headers["x-shop-id"];


    const review = await Review.findById(reviewId);

    if (review.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this review" });
    }

    await review.remove();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review", error });
  }
};
