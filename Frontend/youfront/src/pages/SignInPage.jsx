import React, { useState } from "react";
import { login } from "../api/Service";
import youtube_logo from "../assets/youtube_logo.png";
import RegisterPage from "./RegisterPage";
import "../style/SignInPage.css";

// Custom hook for form state management
const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  return [values, handleChange];
};

const SignInPage = ({ isOpen, onClose, onLogin }) => {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [formData, handleChange] = useForm({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // For button state
  const [generalError, setGeneralError] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setGeneralError(""); // Reset error state
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true); // Show loading state
    try {
      const response = await login(formData);
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
        onLogin(response);
        alert("Login successful!");
        onClose(); // Close modal after successful login
      } else {
        throw new Error("Invalid server response.");
      }
    } catch (error) {
      setGeneralError(
        "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const toggleCreateAccount = () => {
    setIsCreatingAccount((prev) => !prev);
    setErrors({}); // Clear errors when toggling views
    setGeneralError("");
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      aria-hidden={!isOpen}
      role="dialog"
    >
      <div className="modal-content">
        <img src={youtube_logo} alt="YouTube Logo" className="modal-logo" />
        {isCreatingAccount ? (
          <RegisterPage onClose={onClose} switchToLogin={toggleCreateAccount} />
        ) : (
          <>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  className={`modal-input ${errors.email ? "input-error" : ""}`}
                  placeholder="Email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className={`modal-input ${
                    errors.password ? "input-error" : ""
                  }`}
                  placeholder="Password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="error-text">{errors.password}</p>
                )}
              </div>
              <div className="modal-remember">
                <div>
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
                <a href="#" className="modal-link">
                  Lost Password?
                </a>
              </div>
              <button className="modal-button" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
            <button className="modal-button cancel-button" onClick={onClose}>
              Cancel
            </button>
            {generalError && <p className="error-text">{generalError}</p>}
            <p className="modal-footer">
              Not registered?{" "}
              <span onClick={toggleCreateAccount} className="link">
                Create account
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignInPage;
