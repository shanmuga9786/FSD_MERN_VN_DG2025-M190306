const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    genre: {
      type: String,
      default: "General",
    },
    language: {
      type: String,
      default: "English",
    },
    stock: {
      type: Number,
      default: 10,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
