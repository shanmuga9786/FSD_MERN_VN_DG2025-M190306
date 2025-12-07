import React, { useEffect, useState } from "react";
import api from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders/my");
      setOrders(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        "Failed to load your orders. Please login again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p className="error">{error}</p>;

  if (orders.length === 0) {
    return <p>You have no orders yet.</p>;
  }

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      <p className="orders-subtitle">
        View your past orders and track their status.
      </p>

      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <span className="order-id">#{order._id.slice(-6)}</span>
              <span className={`order-status status-${order.status}`}>
                {order.status.toUpperCase()}
              </span>
            </div>

            <p className="order-date">
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="order-items">
              {order.items.map((item, index) => (
                <div className="order-item-row" key={index}>
                  <div>
                    <p className="order-book-title">
                      {item.book?.title || "Book"}
                    </p>
                    <p className="author">
                      {item.book?.author || ""}
                    </p>
                  </div>
                  <div className="order-item-right">
                    <span>Qty: {item.quantity}</span>
                    <span>₹{item.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-footer">
              <p>Total: ₹{order.totalPrice}</p>
              <p className="order-payment">
                Payment: {order.paymentStatus.toUpperCase()}
              </p>
              {order.shippingAddress && (
                <p className="order-address">
                  Address: {order.shippingAddress}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
