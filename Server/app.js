const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());

// Middle ware to extract info from the html body name attribute
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Middle ware to extract info from the frontend that are sent through json
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "march", // MySQL username
  password: "march", // MySQL password
  database: "march", // Database to use
  // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock", // Uncomment if using MAC
});

db.connect((err) => {
  if (err) {
    console.log("❌ DB connection failed: ", err.message); // Log error if connection fails
  } else {
    console.log("✅ Connected to MySQL database!"); // Log success message
  }
});

app.get("/", (req, res) => {
  res.send("Up and running");
});

// Create tables
app.get("/create-table", (req, res) => {
  // SQL query to create 'customer' table
  let customer =
    "CREATE TABLE IF NOT EXISTS customers (customer_id INT AUTO_INCREMENT, name VARCHAR(255) NOT NULL,PRIMARY KEY (customer_id))";
  // SQL query to create 'address' table
  let address = `CREATE TABLE IF NOT EXISTS address (
        address_id INT AUTO_INCREMENT,
        customer_id INT(11) NOT NULL,
        address VARCHAR(255) NOT NULL,
        PRIMARY KEY (address_id),
        FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
    )`;

  // SQL query to create 'company' table
  let company = `CREATE TABLE IF NOT EXISTS company (
        company_id INT AUTO_INCREMENT,
        customer_id INT(11) NOT NULL,
        company VARCHAR(255) NOT NULL,
        PRIMARY KEY (company_id),
        FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
    )`;

  db.query(customer, (err) => {
    if (err) console.log(err);
  });
  db.query(address, (err) => {
    if (err) console.log(err);
  });
  db.query(company, (err) => {
    if (err) console.log(err);
  });

  res.send("Table created");
});

// CRUD (Create, Read, Update, Delete)

// #1. Route: /add-customer => To insert customer data to the tables
app.post("/add-customer", (req, res) => {
  const { name, address, company } = req.body;

  let insertName = "INSERT INTO customers (name) VALUES (?)";
  let insertAddress =
    "INSERT INTO address (customer_id, address) VALUES (?, ?)";
  let insertCompany =
    "INSERT INTO company (customer_id, company) VALUES (?, ?)";

  db.query(insertName, [name], (err, result, fields) => {
    if (err) console.log(err);
    else {
      let id = result.insertId;
      db.query(insertAddress, [id, address], (err) => {
        if (err) console.log(err);
      });
      db.query(insertCompany, [id, company], (err) => {
        if (err) console.log(err);
      });
    }
  });
  res.send("Recieved");
});

// #2. Route: /customers => To retrieve data from the tables
app.get("/customers", (req, res) => {
  let customers = `SELECT * FROM customers JOIN address JOIN company ON customers.customer_id = address.customer_id AND customers.customer_id = company.customer_id`;

  db.query(customers, (err, results, field) => {
    if (err) console.log(err);
    else res.send(results);
  });
});

// #3. Route: /update => To  update data from the tables

app.put("/update", (req, res) => {
  const { newName, id } = req.body;
  console.log(req.body);
  let updateSql = `UPDATE customers SET name = '${newName}' WHERE customer_id = '${id}'`;

  db.query(updateSql, (err) => {
    if (err) console.log(err);
  });
  res.send("customer name updated successfully!");
});

// #4. Route: /remove-user => To delete all data from the tables
app.delete("/delete", (req, res) => {
  const { id } = req.body;
  let deleteName = `DELETE FROM customers WHERE customer_id = '${id}'`;
  let deleteAddress = `DELETE FROM address WHERE customer_id = '${id}'`;
  let deleteCompany = `DELETE FROM company WHERE customer_id = '${id}'`;

  
  db.query(deleteAddress, (err) => {
    if (err) console.log(err);
  });
  db.query(deleteCompany, (err) => {
    if (err) console.log(err);
  });
  db.query(deleteName, (err) => {
    if (err) console.log(err);
  });

  res.send("Customer Deleted successfully!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
