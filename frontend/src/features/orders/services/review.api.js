import http from "../../../services/http.service";

export const addReview = (reviewData) => {
	if (reviewData instanceof FormData) {
		return http.postForm("/reviews", reviewData);
	}

	return http.post("/reviews", reviewData);
};

export const getProductReviews = (productId) => http.get(`/reviews/${productId}`);

export const markReviewHelpful = (productId, reviewId) => 
	http.post(`/reviews/${productId}/${reviewId}/helpful`);
