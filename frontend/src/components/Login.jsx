import React, { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // Component for user login functionality
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handles login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sends login request to the server
      const { data } = await API.post("/users/login", formData);
      localStorage.setItem("token", data.token);
      navigate("/tasks");
      // Handle login errors
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container " style={{backgroundColor: "black"}}>
      <div className="login-card">
        <div className="login-header">
          <h2>Login</h2>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="input-field"
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <Link to={'/register'}>Register</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;