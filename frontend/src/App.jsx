import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Login from "./Login"; // Your Login component
import Package from "./Package";
import Car from "./Car";
import Service from "./Service";
import Payment from "./Payment";

const Home = () => (
  <div
    style={{
      width: "100%",
      backgroundColor: "#f8f9fa",
      padding: "4rem 1rem",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      borderRadius: "0 0 1rem 1rem",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      className="text-center"
      style={{
        maxWidth: "900px",
        color: "#212529",
      }}
    >
      <h1 className="mb-3">Welcome to Your Dashboard!</h1>
      <p className="lead">
        Use the sidebar to navigate through packages, cars, services, and
        payments.
      </p>
      <i
        className="bi bi-house-door-fill"
        style={{ fontSize: "6rem", opacity: 0.6, color: "#495057" }}
      ></i>
    </div>
  </div>
);

const styles = {
  sidebar: {
    width: "260px",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #1e3c72, #2a5298)",
    color: "white",
    boxShadow: "3px 0 10px rgba(0,0,0,0.3)",
  },
  navLink: {
    transition: "all 0.3s ease",
  },
  mainContent: {
    background: "linear-gradient(135deg, #f0f4ff, #d9e3ff)",
    minHeight: "100vh",
    overflowY: "auto",
    padding: "2rem",
    flexGrow: 1,
  },
};

const Sidebar = ({ onLogout }) => (
  <nav className="d-flex flex-column p-3" style={styles.sidebar}>
    <h3 className="text-center mb-4">Dashboard</h3>
    <ul className="nav nav-pills flex-column gap-3">
      <li className="nav-item">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            "nav-link text-white fs-5 d-flex align-items-center" +
            (isActive ? " active" : "")
          }
          style={styles.navLink}
        >
          <i className="bi bi-house-door-fill me-3"></i> Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/package"
          className={({ isActive }) =>
            "nav-link text-white fs-5 d-flex align-items-center" +
            (isActive ? " active" : "")
          }
          style={styles.navLink}
        >
          <i className="bi bi-box-seam me-3"></i> Packages
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/car"
          className={({ isActive }) =>
            "nav-link text-white fs-5 d-flex align-items-center" +
            (isActive ? " active" : "")
          }
          style={styles.navLink}
        >
          <i className="bi bi-car-front-fill me-3"></i> Cars
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/service"
          className={({ isActive }) =>
            "nav-link text-white fs-5 d-flex align-items-center" +
            (isActive ? " active" : "")
          }
          style={styles.navLink}
        >
          <i className="bi bi-gear-fill me-3"></i> Services
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to="/payment"
          className={({ isActive }) =>
            "nav-link text-white fs-5 d-flex align-items-center" +
            (isActive ? " active" : "")
          }
          style={styles.navLink}
        >
          <i className="bi bi-credit-card-2-front-fill me-3"></i> Payments
        </NavLink>
      </li>
      <li className="nav-item mt-auto">
        <button
          onClick={onLogout}
          className="btn btn-danger w-100 d-flex align-items-center justify-content-center"
          style={{ gap: "0.5rem" }}
        >
          <i className="bi bi-box-arrow-right"></i> Logout
        </button>
      </li>
    </ul>
  </nav>
);

const DashboardLayout = ({ onLogout }) => (
  <div className="d-flex" style={{ minHeight: "100vh" }}>
    <Sidebar onLogout={onLogout} />
    <main style={styles.mainContent}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/package" element={<Package />} />
        <Route path="/car" element={<Car />} />
        <Route path="/service" element={<Service />} />
        <Route path="/payment" element={<Payment />} />
        {/* Catch all unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  </div>
);

const App = () => {
  // Simple auth state (replace with your real auth logic)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {!isAuthenticated && (
          <Route
            path="/login"
            element={
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "1rem" }}
              >
                <Login onLogin={handleLogin} />
              </div>
            }
          />
        )}

        {!isAuthenticated && (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}

        {isAuthenticated && (
          <Route
            path="/*"
            element={<DashboardLayout onLogout={handleLogout} />}
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
