import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Dashboard</h1>
      <div className="row g-4">
        <div className="col-md-3">
          <Link to="/car" className="text-decoration-none">
            <div className="card text-white bg-primary h-100">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h3>Car</h3>
                <p>Manage Cars</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/package" className="text-decoration-none">
            <div className="card text-white bg-success h-100">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h3>Package</h3>
                <p>Manage Packages</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/payment" className="text-decoration-none">
            <div className="card text-white bg-warning h-100">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h3>Payment</h3>
                <p>Manage Payments</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/service" className="text-decoration-none">
            <div className="card text-white bg-danger h-100">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h3>Service</h3>
                <p>Manage Services</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
