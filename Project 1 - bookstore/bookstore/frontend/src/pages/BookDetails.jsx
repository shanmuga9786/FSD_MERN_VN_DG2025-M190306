import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

function BookDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedMsg, setAddedMsg] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/books/${id}`);
        setBook(res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load book");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToCart = () => {
    if (book) {
      addToCart(book, 1);
      setAddedMsg("Added to cart!");
      setTimeout(() => setAddedMsg(""), 1000);
    }
  };

  if (loading) return <p>Loading book...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="book-details">
      {book.imageUrl && (
        <img
          src={book.imageUrl}
          alt={book.title}
          className="book-details-image"
        />
      )}
      <div>
        <h2>{book.title}</h2>
        <p className="author">{book.author}</p>
        <p className="genre">Genre: {book.genre}</p>
        <p className="language">Language: {book.language}</p>
        <p className="price">Price: ₹{book.price}</p>
        {book.description && (
          <p className="description">{book.description}</p>
        )}

        <button className="add-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        {addedMsg && <span className="added-msg">{addedMsg}</span>}
      </div>
    </div>
  );
}

export default BookDetails;
