const express = require("express");
const { 
  createOrder, 
  getUserOrders, 
  getOrderById,
  addAddress,
  getUserAddresses,
  deleteAddress,
  getPaymentMethods,
  deletePaymentMethod,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/orders", protect, createOrder);
router.get("/orders", protect, getUserOrders);
router.get("/orders/:orderId", protect, getOrderById);
router.post("/addresses", protect, addAddress);
router.get("/addresses", protect, getUserAddresses);
router.delete("/addresses/:id", protect, deleteAddress);
router.get("/payment-methods", protect, getPaymentMethods);
router.delete("/payment-methods/:id", protect, deletePaymentMethod);

module.exports = router;
