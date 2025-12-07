const express = require("express");
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// User routes
router.post("/", protect, placeOrder);       // POST /api/orders
router.get("/my", protect, getMyOrders);     // GET /api/orders/my

// Admin routes
router.get("/", protect, adminOnly, getAllOrders);                // GET /api/orders
router.patch("/:id/status", protect, adminOnly, updateOrderStatus); // PATCH /api/orders/:id/status

module.exports = router;
