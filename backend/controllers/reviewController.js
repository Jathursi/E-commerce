const reviewService = require("../services/reviewService");

// Add review to product
const addReview = async (req, res, next) => {
  try {
    const { productId, orderId, rating, comment, images: imagesFromBody } = req.body;
    const userId = req.user?._id;
    const userName = req.user?.name || req.user?.email;

    if (!userId || !userName) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const numericRating = Number(rating);

    if (!productId || !orderId || !numericRating) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (numericRating < 1 || numericRating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const uploadedImages = (req.files || []).map((file) => `/uploads/${file.filename}`);
    const parsedImages = Array.isArray(imagesFromBody)
      ? imagesFromBody.filter(Boolean)
      : imagesFromBody
      ? [imagesFromBody]
      : [];
    const images = [...parsedImages, ...uploadedImages];

    const result = await reviewService.addReview({
      userId,
      userName,
      productId,
      orderId,
      rating: numericRating,
      comment: comment || "",
      images,
    });

    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

// Get reviews for a product
const getProductReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const reviews = await reviewService.getProductReviews(productId);
    return res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// Mark review as helpful
const markReviewHelpful = async (req, res, next) => {
  try {
    const { productId, reviewId } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!productId || !reviewId) {
      return res.status(400).json({ message: "Product ID and Review ID are required" });
    }

    const result = await reviewService.markReviewHelpful({
      userId,
      productId,
      reviewId,
    });

    return res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addReview,
  getProductReviews,
  markReviewHelpful,
};
