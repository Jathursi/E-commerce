const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		userName: {
			type: String,
			required: true,
			trim: true,
		},
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		productName: {
			type: String,
			required: true,
			trim: true,
		},
		quantity: {
			type: Number,
			required: true,
			min: 1,
			default: 1,
		},
		totalPrice: {
			type: Number,
			required: true,
			min: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
