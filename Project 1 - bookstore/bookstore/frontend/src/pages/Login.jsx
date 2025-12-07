import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });

      const { token, user } = res.data;

      // 🔥 centralized login
      login(user, token);

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Login failed. Check your details.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p className="auth-subtitle">
          Login to continue exploring your favorite books.
        </p>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer-text">
          New here?{" "}
          <span className="auth-link" onClick={() => navigate("/register")}>
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
