const express = require("express");
const { addReview, getProductReviews, markReviewHelpful } = require("../controllers/reviewController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

const optionalUpload = (req, res, next) => {
	const contentType = req.headers["content-type"] || "";
	if (contentType.includes("multipart/form-data")) {
		return upload.array("images", 3)(req, res, next);
	}
	return next();
};
const router = express.Router();

router.post("/reviews", protect, optionalUpload, addReview);
router.get("/reviews/:productId", getProductReviews);
router.post("/reviews/:productId/:reviewId/helpful", protect, markReviewHelpful);

module.exports = router;
