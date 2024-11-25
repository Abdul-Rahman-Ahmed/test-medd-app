import React, { useState } from "react";
import validator from "validator"; // Importing validator library
import "./Sign_Up.css";

const Sign_Up = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Validation Function
  const validate = () => {
    const errors = {};

    // Name validation
    if (validator.isEmpty(formData.name)) {
      errors.name = "Name is required.";
    }

    // Phone validation (exactly 10 digits)
    if (!validator.isLength(formData.phone, { min: 10, max: 10 }) || !validator.isNumeric(formData.phone)) {
      errors.phone = "Phone must be exactly 10 digits.";
    }

    // Email validation
    if (!validator.isEmail(formData.email)) {
      errors.email = "Email is not valid.";
    }

    // Password validation
    if (!validator.isLength(formData.password, { min: 6 })) {
      errors.password = "Password must be at least 6 characters long.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Signup Successful!");
      console.log("Form Data:", formData);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Sign Up</h1>
        </div>
        <div className="signup-text1" style={{ textAlign: "left" }}>
          Already a member?{" "}
          <span>
            <a href="../Login/Login.html" style={{ color: "#2190FF" }}>
              Login
            </a>
          </span>
        </div>
        <div className="signup-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <small className="error-text">{errors.name}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                className="form-control"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <small className="error-text">{errors.phone}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="form-control"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <small className="error-text">{errors.email}</small>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <small className="error-text">{errors.password}</small>
              )}
            </div>

            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
              >
                Submit
              </button>
              <button
                type="reset"
                className="btn btn-danger mb-2 waves-effect waves-light"
                onClick={() => setFormData({ name: "", phone: "", email: "", password: "" })}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sign_Up;
