const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { protect, isAdmin } = require("../middlewares/authMiddleware");

router.get("/user-details", protect, isAdmin, adminController.fetchUser);
router.post("/add-user", protect, isAdmin, adminController.addUser);
router.delete("/user/:id", protect, isAdmin, adminController.deleteUser);

// Orders for admin
router.get("/orders", protect, isAdmin, adminController.getAllOrders);
router.patch("/orders/:id/status", protect, isAdmin, adminController.updateOrderStatus);

// Analytics for admin
router.get("/analytics", protect, isAdmin, adminController.getAnalytics);

module.exports = router;
