import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/register", { name, email, password });

      const { token, user } = res.data;

      // 🔥 after register, auto login
      login(user, token);

      setSuccess("Registered successfully! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || "Registration failed. Try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">
          Join BookStore and start exploring amazing books.
        </p>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Name
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

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
              placeholder="Minimum 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
