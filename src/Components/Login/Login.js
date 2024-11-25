import React, { useState } from "react";
import validator from "validator"; // Importing validator library
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Validation function
  const validate = () => {
    const errors = {};

    // Email validation
    if (!validator.isEmail(formData.email)) {
      errors.email = "Email is not valid.";
    }

    // Password validation
    if (validator.isEmpty(formData.password)) {
      errors.password = "Password is required.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Login Successful!");
      console.log("Login Data:", formData);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container">
      <div className="login-grid">
        <div className="login-text">
          <h2>Login</h2>
        </div>
        <div className="login-text">
          Are you a new member?{" "}
          <span>
            <a href="../Sign_Up/Sign_Up.html" style={{ color: "#2190FF" }}>
              Sign Up Here
            </a>
          </span>
        </div>
        <br />
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
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
                Login
              </button>
              <button
                type="reset"
                className="btn btn-danger mb-2 waves-effect waves-light"
                onClick={() => setFormData({ email: "", password: "" })}
              >
                Reset
              </button>
            </div>
            <br />
            <div className="login-text">Forgot Password?</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
