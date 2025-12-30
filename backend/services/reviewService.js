const Product = require("../models/Product");
const Order = require("../models/Order");

const addReview = async ({ userId, userName, productId, orderId, rating, comment, images = [] }) => {
  // Verify order exists, belongs to user, is delivered, and item not yet reviewed
  const order = await Order.findOne({ orderId, userId });

  if (!order) {
    const err = new Error("Order not found");
    err.statusCode = 404;
    throw err;
  }

  if (order.status?.toLowerCase() !== "delivered") {
    const err = new Error("Can only review delivered orders");
    err.statusCode = 400;
    throw err;
  }

  const itemIndex = order.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex === -1) {
    const err = new Error("Product not found in this order");
    err.statusCode = 404;
    throw err;
  }

  if (order.items[itemIndex].reviewed) {
    const err = new Error("You have already reviewed this product");
    err.statusCode = 400;
    throw err;
  }

  // Add review to product
  const product = await Product.findById(productId);
  if (!product) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    throw err;
  }

  product.reviews.push({
    userId,
    userName,
    orderId,
    rating,
    comment,
    images,
  });

  // Update aggregate fields
  product.totalReviews = product.reviews.length;
  const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
  product.averageRating = totalRating / product.totalReviews;

  await product.save();

  // Mark item as reviewed in order
  order.items[itemIndex].reviewed = true;
  await order.save();

  return {
    message: "Review added successfully",
    review: product.reviews[product.reviews.length - 1],
    averageRating: product.averageRating,
    totalReviews: product.totalReviews,
  };
};

const getProductReviews = async (productId) => {
  const product = await Product.findById(productId).select("reviews averageRating totalReviews");

  if (!product) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    throw err;
  }

  return {
    reviews: product.reviews.sort((a, b) => b.createdAt - a.createdAt),
    averageRating: product.averageRating,
    totalReviews: product.totalReviews,
  };
};

const markReviewHelpful = async ({ userId, productId, reviewId }) => {
  const product = await Product.findById(productId);

  if (!product) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    throw err;
  }

  const review = product.reviews.id(reviewId);
  if (!review) {
    const err = new Error("Review not found");
    err.statusCode = 404;
    throw err;
  }

  const alreadyMarked = review.helpfulBy.some(
    (id) => id.toString() === userId.toString()
  );

  if (alreadyMarked) {
    // Remove the helpful mark (unlike)
    review.helpfulBy = review.helpfulBy.filter(
      (id) => id.toString() !== userId.toString()
    );
    review.helpfulCount = Math.max(0, review.helpfulCount - 1);
  } else {
    // Add the helpful mark (like)
    review.helpfulBy.push(userId);
    review.helpfulCount = (review.helpfulCount || 0) + 1;
  }

  await product.save();

  return {
    message: alreadyMarked ? "Helpful mark removed" : "Marked as helpful",
    helpfulCount: review.helpfulCount,
    isHelpful: !alreadyMarked,
  };
};

module.exports = {
  addReview,
  getProductReviews,
  markReviewHelpful,
};
