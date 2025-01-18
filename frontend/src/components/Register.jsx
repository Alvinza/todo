import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Component for user registration
const Register = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Send POST request to register user
      await API.post("/users/register", formData);
      alert("Registration successful. Please log in.");
    } catch (error) {
      // Handle errors during registration
      alert(error.response?.data?.message || "Registration failed");
    }
    navigate("/login"); // Navigate to login page
  };

  return (
    <div className="register-container" style={{ backgroundColor: "black" }}>
      <form onSubmit={handleSubmit} className="register-form">
        <Link to='/'>Back</Link>
        <h2 className="register-title">Register</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
