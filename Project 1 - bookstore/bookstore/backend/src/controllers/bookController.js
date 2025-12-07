const Book = require("../models/Book");

// GET /api/books  (with optional search, genre)
const getBooks = async (req, res) => {
  try {
    const { search, genre } = req.query;

    const query = {};

    if (search) {
      // title or author la search
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }

    if (genre) {
      query.genre = { $regex: genre, $options: "i" };
    }

    const books = await Book.find(query).sort({ createdAt: -1 });

    res.json(books);
  } catch (error) {
    console.error("Get books error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/books/:id
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    console.error("Get book by id error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/books  (admin only)
const createBook = async (req, res) => {
  try {
    const { title, author, description, price, genre, language, stock, rating, imageUrl } =
      req.body;

    if (!title || !author || price == null) {
      return res.status(400).json({ message: "Title, author, and price are required" });
    }

    const book = await Book.create({
      title,
      author,
      description,
      price,
      genre,
      language,
      stock,
      rating,
      imageUrl,
    });

    res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    console.error("Create book error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/books/:id  (admin only)
const updateBook = async (req, res) => {
  try {
    const updates = req.body;

    const book = await Book.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    console.error("Update book error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/books/:id  (admin only)
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Delete book error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
