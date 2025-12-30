const express = require("express");
const { addToCart, getCart, updateCartItem, removeCartItem } = require("../controllers/cartController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/cart", protect, addToCart);
router.get("/cart", protect, getCart);
router.patch("/cart/:id", protect, updateCartItem);
router.delete("/cart/:id", protect, removeCartItem);

module.exports = router;
