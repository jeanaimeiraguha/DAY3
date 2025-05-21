import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/servicepackages";

export default function Service() {
  const [servicePackages, setServicePackages] = useState([]);
  const [form, setForm] = useState({ recordnumber: "", servicename: "" });
  const [editing, setEditing] = useState(false);
  const [originalRecordNumber, setOriginalRecordNumber] = useState("");

  // Fetch all service packages
  const fetchServicePackages = async () => {
    try {
      const res = await axios.get(API);
      setServicePackages(res.data);
    } catch {
      alert("Failed to fetch service packages");
    }
  };

  useEffect(() => {
    fetchServicePackages();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API}/${originalRecordNumber}`, form);
        alert("Service package updated");
      } else {
        await axios.post(API, form);
        alert("Service package added");
      }
      resetForm();
      fetchServicePackages();
    } catch {
      alert("Error saving service package");
    }
  };

  const handleEdit = (sp) => {
    setForm(sp);
    setOriginalRecordNumber(sp.recordnumber);
    setEditing(true);
  };

  const handleDelete = async (recordnumber) => {
    if (window.confirm("Delete this service package?")) {
      try {
        await axios.delete(`${API}/${recordnumber}`);
        alert("Service package deleted");
        fetchServicePackages();
      } catch {
        alert("Failed to delete service package");
      }
    }
  };

  const resetForm = () => {
    setForm({ recordnumber: "", servicename: "" });
    setEditing(false);
    setOriginalRecordNumber("");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4 text-center">Service Packages</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-4">
            <input
              type="text"
              name="recordnumber"
              placeholder="Record Number"
              value={form.recordnumber}
              onChange={handleChange}
              required
              disabled={editing}
              className="form-control"
            />
          </div>

          <div className="col-md-5">
            <input
              type="text"
              name="servicename"
              placeholder="Service Name"
              value={form.servicename}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>

          <div className="col-md-3 d-flex gap-2">
            <button
              type="submit"
              className={`btn ${editing ? "btn-success" : "btn-primary"}`}
              title={editing ? "Update" : "Add"}
            >
              <i className={`bi ${editing ? "bi-pencil-square" : "bi-plus-lg"}`}></i>
            </button>

            {editing && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
                title="Cancel"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-dark text-center">
          <tr>
            <th style={{ width: "30%" }}>Record Number</th>
            <th style={{ width: "50%" }}>Service Name</th>
            <th style={{ width: "20%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {servicePackages.length > 0 ? (
            servicePackages.map((sp) => (
              <tr key={sp.recordnumber}>
                <td className="text-center">{sp.recordnumber}</td>
                <td>{sp.servicename}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    title="Edit"
                    onClick={() => handleEdit(sp)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    title="Delete"
                    onClick={() => handleDelete(sp.recordnumber)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                No service packages found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
