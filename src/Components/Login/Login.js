import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import "./Login.css"; // Apply CSS as needed

const Login = () => {
  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State variable for error messages
  const [errorMessage, setErrorMessage] = useState("");

  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, [navigate]);

  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error messages

    // API call to login endpoint
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const json = await res.json();

      if (json.authtoken) {
        // If authentication token is received, store it in session storage
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("email", email);

        // Redirect to home page and reload the window
        navigate("/");
        window.location.reload();
      } else {
        // Display error messages
        if (json.errors) {
          setErrorMessage(json.errors[0].msg || "Invalid credentials.");
        } else {
          setErrorMessage(json.error || "Login failed.");
        }
      }
    } catch (err) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
          <div className="login-text">
            Are you a new member?{" "}
            <span>
              <Link to="/signup" style={{ color: "#2190FF" }}>
                Sign Up Here
              </Link>
            </span>
          </div>
          <br />
          <div className="login-form">
            <form onSubmit={login}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  aria-describedby="passwordHelp"
                  required
                />
              </div>
              {errorMessage && (
                <div className="error-message" style={{ color: "red" }}>
                  {errorMessage}
                </div>
              )}
              <div className="btn-group">
                <button
                  type="submit"
                  className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
