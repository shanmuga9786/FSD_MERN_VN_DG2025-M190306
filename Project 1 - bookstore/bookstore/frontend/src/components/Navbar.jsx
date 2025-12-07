import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { user, isLoggedIn, isAdmin, logout } = useAuth();

  const userName = user?.name || "";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          BookStore
        </Link>
      </div>

      <div className="nav-right">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>

        <NavLink to="/cart" className="nav-link nav-icon-link">
          <FaShoppingCart className="nav-icon" />
          <span>Cart</span>
          {totalItems > 0 && (
            <span className="cart-badge">{totalItems}</span>
          )}
        </NavLink>

        {isLoggedIn && (
          <NavLink to="/orders" className="nav-link">
            My Orders
          </NavLink>
        )}

        {isAdmin && (
          <>
            <NavLink to="/admin/books" className="nav-link">
              Admin Books
            </NavLink>
            <NavLink to="/admin/orders" className="nav-link">
              Admin Orders
            </NavLink>
          </>
        )}

        {isLoggedIn ? (
          <>
            <span className="nav-user">{userName}</span>
            <button className="nav-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link nav-icon-link">
              <FaSignInAlt className="nav-icon" />
              <span>Login</span>
            </NavLink>
            <NavLink to="/register" className="nav-link nav-icon-link">
              <FaUserPlus className="nav-icon" />
              <span>Register</span>
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
