import React, { useEffect, useState } from "react";
import api from "../services/api";

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      setOrders(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Failed to load orders. Admin only.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="error">{error}</p>;

  if (orders.length === 0) {
    return <p>No orders yet.</p>;
  }

  return (
    <div className="admin-page">
      <h2>Admin – All Orders</h2>
      <p className="orders-subtitle">
        View all user orders and update their status.
      </p>

      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <span className="order-id">#{order._id.slice(-6)}</span>
              <select
                value={order.status}
                onChange={(e) =>
                  handleStatusChange(order._id, e.target.value)
                }
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <p className="order-date">
              {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="order-payment">
              User: {order.user?.name} ({order.user?.email})
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

export default AdminOrders;
