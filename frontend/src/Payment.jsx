import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000";

export default function Payment() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    paymentnumber: "",
    platenumber: "",
    packagenumber: "",
    amountpaid: "",
    paymentdate: "",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  function fetchPayments() {
    axios
      .get(`${API_BASE}/payments`)
      .then((res) => setPayments(res.data))
      .catch((err) => alert(err.message));
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      paymentnumber: form.paymentnumber,
      platenumber: form.platenumber,
      packagenumber: form.packagenumber,
      amountpaid: form.amountpaid,
      paymentdate: form.paymentdate,
    };

    if (editing) {
      axios
        .put(`${API_BASE}/payments/${editing}`, payload)
        .then(() => {
          fetchPayments();
          resetForm();
        })
        .catch((err) => alert(err.message));
    } else {
      axios
        .post(`${API_BASE}/payments`, payload)
        .then(() => {
          fetchPayments();
          resetForm();
        })
        .catch((err) => alert(err.message));
    }
  }

  function resetForm() {
    setForm({
      paymentnumber: "",
      platenumber: "",
      packagenumber: "",
      amountpaid: "",
      paymentdate: "",
    });
    setEditing(null);
  }

  function handleEdit(payment) {
    // Format paymentdate to YYYY-MM-DD for date input
    const formattedPayment = {
      ...payment,
      paymentdate: payment.paymentdate ? payment.paymentdate.split("T")[0] : "",
    };
    setForm(formattedPayment);
    setEditing(payment.paymentnumber);
  }

  function handleDelete(paymentnumber) {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      axios
        .delete(`${API_BASE}/payments/${paymentnumber}`)
        .then(() => fetchPayments())
        .catch((err) => alert(err.message));
    }
  }

  return (
    <div>
      <h2>Payments</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="paymentnumber"
          placeholder="Payment Number"
          value={form.paymentnumber}
          onChange={handleChange}
          disabled={editing !== null}
          required
        />
        <input
          name="platenumber"
          placeholder="Plate Number"
          value={form.platenumber}
          onChange={handleChange}
          required
        />
        <input
          name="packagenumber"
          placeholder="Package Number"
          value={form.packagenumber}
          onChange={handleChange}
          required
        />
        <input
          name="amountpaid"
          placeholder="Amount Paid"
          type="number"
          value={form.amountpaid}
          onChange={handleChange}
          required
        />
        <input
          name="paymentdate"
          placeholder="Payment Date"
          type="date"
          value={form.paymentdate}
          onChange={handleChange}
          required
        />
        <button type="submit">{editing ? "Update" : "Add"}</button>
        {editing && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Payment Number</th>
            <th>Plate Number</th>
            <th>Package Number</th>
            <th>Amount Paid</th>
            <th>Payment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan="6">No payments found</td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr key={payment.paymentnumber}>
                <td>{payment.paymentnumber}</td>
                <td>{payment.platenumber}</td>
                <td>{payment.packagenumber}</td>
                <td>{payment.amountpaid}</td>
                <td>{payment.paymentdate ? payment.paymentdate.split("T")[0] : ""}</td>
                <td>
                  <button onClick={() => handleEdit(payment)}>Edit</button>
                  <button onClick={() => handleDelete(payment.paymentnumber)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
