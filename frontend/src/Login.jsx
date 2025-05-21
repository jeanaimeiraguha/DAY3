import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCreating, setIsCreating] = useState(false); // toggle between login and create account
  const navigate = useNavigate();

  // Auto-login if stayLoggedIn is true in localStorage
  useEffect(() => {
    const savedLogin = localStorage.getItem("stayLoggedIn");
    if (savedLogin === "true") {
      onLogin();
      navigate("/");
    }
  }, [navigate, onLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const url = isCreating
      ? "http://localhost:3000/register" // endpoint for creating account
      : "http://localhost:3000/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });

      if (response.status === 200 || response.status === 201) {
        if (isCreating) {
          // Account created, switch to login form with success message
          setIsCreating(false);
          setError("Account created successfully! Please login.");
          setName("");
          setPassword("");
        } else {
          // Successful login
          const data = await response.json();
          localStorage.setItem("stayLoggedIn", stayLoggedIn ? "true" : "false");
          onLogin();
          navigate("/");
        }
      } else if (response.status === 401) {
        setError("Invalid credentials. Please try again.");
      } else if (response.status === 409 && isCreating) {
        // Conflict - username already exists
        setError("Username already exists. Please choose another.");
      } else {
        setError("Something went wrong. Please try later.");
      }
    } catch (err) {
      setError("Network error. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "1rem",
        flexDirection: "column",
      }}
    >
      <div className="text-center mb-4" style={{ maxWidth: "320px" }}>
        <h2>Welcome to Our Site!</h2>
        <p className="text-muted">
          {isCreating
            ? "Create your account to get started."
            : "Please login to continue and stay logged in"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow bg-white"
        style={{ width: "320px", maxWidth: "100%" }}
      >
        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {!isCreating && (
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="stayLoggedIn"
              checked={stayLoggedIn}
              onChange={(e) => setStayLoggedIn(e.target.checked)}
              disabled={loading}
            />
            <label className="form-check-label" htmlFor="stayLoggedIn">
              Stay logged in
            </label>
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              {isCreating ? "Creating account..." : "Logging in..."}
            </>
          ) : isCreating ? (
            "Create Account"
          ) : (
            "Login"
          )}
        </button>
      </form>

      <div className="mt-3" style={{ maxWidth: "320px" }}>
        {isCreating ? (
          <>
            <p>
              Already have an account?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => {
                  setError("");
                  setIsCreating(false);
                }}
                disabled={loading}
                type="button"
              >
                Login here
              </button>
            </p>
          </>
        ) : (
          <>
            <p>
              Don't have an account?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => {
                  setError("");
                  setIsCreating(true);
                }}
                disabled={loading}
                type="button"
              >
                Create one
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
