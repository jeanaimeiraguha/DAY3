import mysql from "mysql";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cwsms",
});

db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
    return;
  }
  console.log("MySQL connected");
});

// ===== CRUD for Package =====
app.post("/packages", (req, res) => {
  const { packagenumber, packagename, packagedescription, packageprice } = req.body;
  const sql = "INSERT INTO package VALUES (?, ?, ?, ?)";
  db.query(sql, [packagenumber, packagename, packagedescription, packageprice], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Package added", result });
  });
});

app.get("/packages", (req, res) => {
  db.query("SELECT * FROM package", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.put("/packages/:packagenumber", (req, res) => {
  const { packagename, packagedescription, packageprice } = req.body;
  const { packagenumber } = req.params;
  const sql = "UPDATE package SET packagename=?, packagedescription=?, packageprice=? WHERE packagenumber=?";
  db.query(sql, [packagename, packagedescription, packageprice, packagenumber], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Package not found" });
    res.json({ message: "Package updated", result });
  });
});

app.delete("/packages/:packagenumber", (req, res) => {
  const { packagenumber } = req.params;
  db.query("DELETE FROM package WHERE packagenumber=?", [packagenumber], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Package not found" });
    res.json({ message: "Package deleted", result });
  });
});

// ===== CRUD for Car =====
app.post("/cars", (req, res) => {
  const { platenumber, cartype, carsize, drivename, phonenumber } = req.body;
  const sql = "INSERT INTO car VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [platenumber, cartype, carsize, drivename, phonenumber], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Car added", result });
  });
});

app.get("/cars", (req, res) => {
  db.query("SELECT * FROM car", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.put("/cars/:platenumber", (req, res) => {
  const { platenumber: newPlateNumber, cartype, carsize, drivename, phonenumber } = req.body;
  const { platenumber: oldPlateNumber } = req.params;

  const sql = "UPDATE car SET platenumber=?, cartype=?, carsize=?, drivename=?, phonenumber=? WHERE platenumber=?";
  db.query(sql, [newPlateNumber, cartype, carsize, drivename, phonenumber, oldPlateNumber], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Car not found" });
    res.json({ message: "Car updated", result });
  });
});

app.delete("/cars/:platenumber", (req, res) => {
  const { platenumber } = req.params;
  db.query("DELETE FROM car WHERE platenumber=?", [platenumber], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Car not found" });
    res.json({ message: "Car deleted", result });
  });
});

// ===== CRUD for ServicePackage =====
app.post("/servicepackages", (req, res) => {
  const { recordnumber, servicename } = req.body;
  const sql = "INSERT INTO servicepackage VALUES (?, ?)";
  db.query(sql, [recordnumber, servicename], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Service Package added", result });
  });
});

app.get("/servicepackages", (req, res) => {
  db.query("SELECT * FROM servicepackage", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.put("/servicepackages/:recordnumber", (req, res) => {
  const { servicename } = req.body;
  const { recordnumber } = req.params;
  const sql = "UPDATE servicepackage SET servicename=? WHERE recordnumber=?";
  db.query(sql, [servicename, recordnumber], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Service Package not found" });
    res.json({ message: "Service Package updated", result });
  });
});

app.delete("/servicepackages/:recordnumber", (req, res) => {
  const { recordnumber } = req.params;
  db.query("DELETE FROM servicepackage WHERE recordnumber=?", [recordnumber], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Service Package not found" });
    res.json({ message: "Service Package deleted", result });
  });
});

// ===== CRUD for Payments =====
app.get("/payments", (req, res) => {
  db.query("SELECT * FROM payments", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/payments", (req, res) => {
  const { paymentnumber, platenumber, packagenumber, amountpaid, paymentdate } = req.body;
  const sql = `INSERT INTO payments (paymentnumber, platenumber, packagenumber, amountpaid, paymentdate)
               VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [paymentnumber, platenumber, packagenumber, amountpaid, paymentdate], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Payment added successfully" });
  });
});

app.put("/payments/:paymentnumber", (req, res) => {
  const { platenumber, packagenumber, amountpaid, paymentdate } = req.body;
  const { paymentnumber } = req.params;
  const sql = `UPDATE payments SET platenumber=?, packagenumber=?, amountpaid=?, paymentdate=?
               WHERE paymentnumber=?`;
  db.query(sql, [platenumber, packagenumber, amountpaid, paymentdate, paymentnumber], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment updated successfully" });
  });
});

app.delete("/payments/:paymentnumber", (req, res) => {
  const { paymentnumber } = req.params;
  db.query("DELETE FROM payments WHERE paymentnumber = ?", [paymentnumber], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Payment not found" });
    res.json({ message: "Payment deleted successfully" });
  });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM admin WHERE name = ? AND password = ?";
    const { name, password } = req.body;

    db.query(sql, [name, password], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        return res.status(200).json(result);
    });
});

app.post('/register', (req, res) => {
    const sql = "INSERT INTO admin (name,password)  VALUES(?,?)";
    const { name, password } = req.body;

    db.query(sql, [name, password], (err, result) => {
        if (err) {

            return res.status(500).json({ message: "Database error" });
        }

        return res.status(200).json(result);
    });
});


app.listen(3000, () => {
  console.log("Running on http://localhost:3000");
});
