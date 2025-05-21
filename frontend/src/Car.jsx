import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/cars";

export default function CarComponent() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    platenumber: "",
    cartype: "",
    carsize: "",
    drivename: "",
    phonenumber: "",
  });
  const [editing, setEditing] = useState(false);
  const [originalPlateNumber, setOriginalPlateNumber] = useState(""); // To track original plate number

  // Fetch all cars from backend
  const fetchCars = async () => {
    try {
      const res = await axios.get(API);
      setCars(res.data);
    } catch (err) {
      alert("Failed to fetch cars");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        // Use originalPlateNumber in URL to identify the car to update
        await axios.put(`${API}/${originalPlateNumber}`, {
          platenumber: form.platenumber,
          cartype: form.cartype,
          carsize: form.carsize,
          drivename: form.drivename,
          phonenumber: form.phonenumber,
        });
        alert("Car updated");
      } else {
        await axios.post(API, form);
        alert("Car added");
      }
      // Reset form and editing states
      setForm({
        platenumber: "",
        cartype: "",
        carsize: "",
        drivename: "",
        phonenumber: "",
      });
      setEditing(false);
      setOriginalPlateNumber("");
      fetchCars();
    } catch (err) {
      alert("Error saving car");
    }
  };

  // When user clicks Edit, populate form and save original plate number
  const handleEdit = (car) => {
    setForm(car);
    setOriginalPlateNumber(car.platenumber);
    setEditing(true);
  };

  // Delete car
  const handleDelete = async (platenumber) => {
    if (window.confirm("Delete this car?")) {
      try {
        await axios.delete(`${API}/${platenumber}`);
        alert("Car deleted");
        fetchCars();
      } catch {
        alert("Failed to delete");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Car CRUD</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-2">
            <input
              type="text"
              name="platenumber"
              placeholder="Plate Number"
              value={form.platenumber}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="cartype"
              placeholder="Car Type"
              value={form.cartype}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              name="carsize"
              placeholder="Car Size"
              value={form.carsize}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="drivename"
              placeholder="Driver Name"
              value={form.drivename}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <input
              type="tel"
              name="phonenumber"
              placeholder="Phone Number"
              value={form.phonenumber}
              onChange={handleChange}
              required
              className="form-control"
              pattern="^[0-9\-+\s()]*$"
              title="Enter a valid phone number"
            />
          </div>
          <div className="col-md-1 d-flex gap-2">
            <button
              type="submit"
              className={`btn ${editing ? "btn-success" : "btn-primary"}`}
              title={editing ? "Update" : "Add"}
            >
              <i
                className={`bi ${editing ? "bi-pencil-square" : "bi-plus-lg"}`}
              ></i>
            </button>
            {editing && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setForm({
                    platenumber: "",
                    cartype: "",
                    carsize: "",
                    drivename: "",
                    phonenumber: "",
                  });
                  setEditing(false);
                  setOriginalPlateNumber("");
                }}
                title="Cancel"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Plate Number</th>
            <th>Car Type</th>
            <th>Car Size</th>
            <th>Driver Name</th>
            <th>Phone Number</th>
            <th style={{ width: "120px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.length > 0 ? (
            cars.map((car) => (
              <tr key={car.platenumber}>
                <td>{car.platenumber}</td>
                <td>{car.cartype}</td>
                <td>{car.carsize}</td>
                <td>{car.drivename}</td>
                <td>{car.phonenumber}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    title="Edit"
                    onClick={() => handleEdit(car)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    title="Delete"
                    onClick={() => handleDelete(car.platenumber)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No cars found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
