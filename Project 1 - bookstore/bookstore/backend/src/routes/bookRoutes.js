const express = require("express");
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getBooks);        // GET /api/books
router.get("/:id", getBookById);  // GET /api/books/:id

// Admin routes
router.post("/", protect, adminOnly, createBook);       // POST /api/books
router.put("/:id", protect, adminOnly, updateBook);     // PUT /api/books/:id
router.delete("/:id", protect, adminOnly, deleteBook);  // DELETE /api/books/:id

module.exports = router;
