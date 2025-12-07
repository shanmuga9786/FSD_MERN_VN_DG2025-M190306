import React, { useEffect, useState } from "react";
import api from "../services/api";

function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    genre: "",
    imageUrl: "",
  });
  const [saving, setSaving] = useState(false);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/books");
      setBooks(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Failed to load books. Are you admin?";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.author || !form.price) {
      setError("Title, author, and price are required");
      return;
    }

    try {
      setSaving(true);
      await api.post("/books", {
        title: form.title,
        author: form.author,
        price: Number(form.price),
        genre: form.genre,
        imageUrl: form.imageUrl,
      });
      setForm({
        title: "",
        author: "",
        price: "",
        genre: "",
        imageUrl: "",
      });
      fetchBooks();
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Failed to add book. Check admin role.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await api.delete(`/books/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete book.");
    }
  };

  return (
    <div className="admin-page">
      <h2>Admin – Manage Books</h2>
      <p className="orders-subtitle">
        Add new books and manage existing ones.
      </p>

      {error && <p className="error">{error}</p>}

      <div className="admin-grid">
        <form className="admin-form" onSubmit={handleAddBook}>
          <h3>Add New Book</h3>

          <label>
            Title
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Book title"
            />
          </label>

          <label>
            Author
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Author name"
            />
          </label>

          <label>
            Price
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Price (₹)"
            />
          </label>

          <label>
            Genre
            <input
              name="genre"
              value={form.genre}
              onChange={handleChange}
              placeholder="Genre (optional)"
            />
          </label>

          <label>
            Image URL
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="Image URL (optional)"
            />
          </label>

          <button type="submit" disabled={saving}>
            {saving ? "Adding..." : "Add Book"}
          </button>
        </form>

        <div className="admin-list">
          <h3>All Books ({books.length})</h3>
          {loading ? (
            <p>Loading books...</p>
          ) : books.length === 0 ? (
            <p>No books found.</p>
          ) : (
            <div className="admin-book-list">
              {books.map((book) => (
                <div className="admin-book-row" key={book._id}>
                  <div>
                    <p className="book-title">{book.title}</p>
                    <p className="author">{book.author}</p>
                    <p>₹{book.price}</p>
                  </div>
                  <button
                    className="cart-remove-btn"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminBooks;
