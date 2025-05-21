import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/packages";

export default function PackageComponent() {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState({
    packagenumber: "",
    packagename: "",
    packagedescription: "",
    packageprice: "",
  });
  // Track the original package number to identify record during update
  const [originalPackageNumber, setOriginalPackageNumber] = useState(null);
  const [editing, setEditing] = useState(false);

  const fetchPackages = async () => {
    try {
      const res = await axios.get(API);
      setPackages(res.data);
    } catch (err) {
      alert("Failed to fetch packages");
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        // Use originalPackageNumber in URL to update correct package
        await axios.put(`${API}/${originalPackageNumber}`, {
          packagenumber: form.packagenumber, // updated package number
          packagename: form.packagename,
          packagedescription: form.packagedescription,
          packageprice: form.packageprice,
        });
        alert("Package updated");
      } else {
        await axios.post(API, form);
        alert("Package added");
      }
      // Reset form & editing states
      setForm({ packagenumber: "", packagename: "", packagedescription: "", packageprice: "" });
      setOriginalPackageNumber(null);
      setEditing(false);
      fetchPackages();
    } catch (err) {
      alert("Error saving package");
    }
  };

  const handleEdit = (pkg) => {
    setForm(pkg);
    setOriginalPackageNumber(pkg.packagenumber); // save original number here
    setEditing(true);
  };

  const handleDelete = async (packagenumber) => {
    if (window.confirm("Delete this package?")) {
      try {
        await axios.delete(`${API}/${packagenumber}`);
        alert("Package deleted");
        fetchPackages();
      } catch {
        alert("Failed to delete");
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Package CRUD</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-3">
            <input
              type="text"
              name="packagenumber"
              placeholder="Package Number"
              value={form.packagenumber}
              onChange={handleChange}
              required
              className="form-control"
              title="Package number"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="packagename"
              placeholder="Package Name"
              value={form.packagename}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              name="packagedescription"
              placeholder="Package Description"
              value={form.packagedescription}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="packageprice"
              placeholder="Package Price"
              value={form.packageprice}
              onChange={handleChange}
              required
              min="0"
              className="form-control"
            />
          </div>
          <div className="col-md-1 d-flex gap-2">
            <button
              type="submit"
              className={`btn ${editing ? "btn-success" : "btn-primary"}`}
              title={editing ? "Update Package" : "Add Package"}
            >
              <i className={`bi ${editing ? "bi-pencil-square" : "bi-plus-lg"}`}></i>
            </button>
            {editing && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setForm({ packagenumber: "", packagename: "", packagedescription: "", packageprice: "" });
                  setOriginalPackageNumber(null);
                  setEditing(false);
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
            <th>Package Number</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th style={{ width: "120px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <tr key={pkg.packagenumber}>
                <td>{pkg.packagenumber}</td>
                <td>{pkg.packagename}</td>
                <td>{pkg.packagedescription}</td>
                <td>{pkg.packageprice}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    title="Edit"
                    onClick={() => handleEdit(pkg)}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    title="Delete"
                    onClick={() => handleDelete(pkg.packagenumber)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No packages found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

