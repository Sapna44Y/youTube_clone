import React, { useState } from "react";
import { register } from "../api/Service";
import "../style/SignInPage.css";

const RegisterPage = ({ onClose, switchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      await register({ username, email, password });

      // Clear fields after successful registration
      setUsername("");
      setEmail("");
      setPassword("");

      // Notify parent to switch to login
      switchToLogin();
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Create Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            id="username"
            type="text"
            className="modal-input"
            placeholder="Username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            id="email"
            type="email"
            className="modal-input"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            id="password"
            type="password"
            className="modal-input"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="modal-button" type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <button className="modal-button cancel-button" onClick={onClose}>
          Close
        </button>
        <p className="modal-footer">
          Already have an account?{" "}
          <span onClick={switchToLogin} className="link">
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
