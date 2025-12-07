import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search.trim()) params.search = search.trim();

      const res = await api.get("/books", { params });
      console.log("Books from API:", res.data); // debug
      setBooks(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div className="home">
      <header className="home-header">
        <div>
          <h1>Discover Your Next Favorite Book 📚</h1>
          <p className="home-subtitle">
            Browse our collection, read details, and get inspired to read more.
          </p>
        </div>
      </header>

      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading books...</p>}
      {error && <p className="error">{error}</p>}

      <h2 className="section-title">Available Books</h2>

      <div className="book-grid">
        {books.map((book) => (
          <div className="book-card" key={book._id}>
            {book.imageUrl && (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="book-image"
              />
            )}
            <div className="book-content">
              <h3 className="book-title">{book.title}</h3>
              <p className="author">{book.author}</p>
              <p className="genre-tag">{book.genre || "General"}</p>
              <div className="book-footer">
                <span className="price">₹{book.price}</span>
                <Link to={`/books/${book._id}`} className="details-btn">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}

        {!loading && !error && books.length === 0 && (
          <p>No books found. Try a different search.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
