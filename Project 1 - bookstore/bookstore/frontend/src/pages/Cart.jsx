import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import React from "react";


function Cart() {
  const {
    cartItems,
    totalItems,
    totalPrice,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useCart();
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handlePlaceOrder = async () => {
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to place an order.");
      setTimeout(() => {
        navigate("/login");
      }, 800);
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const items = cartItems.map((item) => ({
        bookId: item.book._id,
        quantity: item.quantity,
      }));

      const res = await api.post("/orders", {
        items,
        shippingAddress: shippingAddress || "Not provided",
        paymentStatus: "cod",
      });

      setSuccess("Order placed successfully!");
      clearCart();
      console.log("Order response:", res.data);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Failed to place order. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Go add some books!</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.book._id}>
                <div className="cart-item-left">
                  {item.book.imageUrl && (
                    <img
                      src={item.book.imageUrl}
                      alt={item.book.title}
                      className="cart-item-image"
                    />
                  )}
                  <div>
                    <h4>{item.book.title}</h4>
                    <p className="author">{item.book.author}</p>
                    <p>Price: ₹{item.book.price}</p>
                  </div>
                </div>
                <div className="cart-item-right">
                  <div className="cart-qty">
                    <label>Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.book._id,
                          Math.max(1, Number(e.target.value) || 1)
                        )
                      }
                    />
                  </div>
                  <p className="cart-item-subtotal">
                    ₹{item.book.price * item.quantity}
                  </p>
                  <button
                    className="cart-remove-btn"
                    onClick={() => removeFromCart(item.book._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p>Total items: {totalItems}</p>
            <p>Total price: ₹{totalPrice}</p>

            <textarea
              className="cart-address"
              placeholder="Shipping address (optional)"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />

            <button
              className="cart-order-btn"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing order..." : "Place Order (COD)"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
