const Order = require("../models/Order");
const Book = require("../models/Book");

// POST /api/orders  (user – place order)
const placeOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentStatus } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    // items format: [{ bookId, quantity }]
    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const { bookId, quantity } = item;

      const book = await Book.findById(bookId);
      if (!book) {
        return res
          .status(404)
          .json({ message: `Book not found: ${bookId}` });
      }

      const qty = quantity || 1;
      const price = book.price * qty;

      totalPrice += price;

      orderItems.push({
        book: book._id,
        quantity: qty,
        price: book.price, // store single unit price
      });
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalPrice,
      shippingAddress: shippingAddress || "",
      paymentStatus: paymentStatus || "cod",
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Place order error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/orders/my  (user – my orders)
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.book", "title author price imageUrl")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get my orders error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/orders  (admin – all orders)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.book", "title author price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Get all orders error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PATCH /api/orders/:id/status  (admin – update status)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status) {
      order.status = status;
    }

    await order.save();

    res.json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
