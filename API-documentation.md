# API Documentation for Customer Management System

This document provides an overview of the RESTful API endpoints for the Customer Management System. This API allows for the creation, retrieval, updating, and deletion of customer information, which includes their name, address, and associated company.

---

## Base URL

`http://localhost:3000`



## Endpoints

### 1. Add a New Customer

`POST /add-customer`

- **Description:** Inserts new customer data (name, address, and company) into the respective tables.
- **Request Body (JSON):**

  ```json
  {
    "name": "John Doe",
    "address": "123 Main St",
    "company": "ABC Corp"
  }
  ```

- **Response:**
  - `201 Created`
  - Body: `Customer added successfully`
- **Notes:** The `customer_id` is auto-generated and used to link the customer's address and company information.

### 2. Retrieve All Customers

`GET /customers`

- **Description:** Retrieves all customer records, including their name, address, and company information, by joining the `customers`, `address`, and `company` tables.
- **Response:**

  - `200 OK`
  - Body (JSON Array): An array of customer objects.

  ```json
  [
    {
      "customer_id": 1,
      "name": "John Doe",
      "address_id": 1,
      "address": "123 Main St",
      "company_id": 1,
      "company": "ABC Corp"
    },
    {
      "customer_id": 2,
      "name": "Jane Smith",
      "address_id": 2,
      "address": "456 Oak Ave",
      "company_id": 2,
      "company": "XYZ Ltd"
    }
  ]
  ```

### 3. Update Customer Name

`Patch /update`

- **Description:** Updates the name of an existing customer based on their `customer_id`.
- **Request Body (JSON):**

  ```json
  {
    "newName": "Jonathan Doe",
    "id": 1
  }
  ```

- **Response:**
  - `200 OK`
  - Body: MySQL query result object (e.g., `{ fieldCount: 0, affectedRows: 1, insertId: 0, ... }`)
- **Notes:** Currently, this endpoint only supports updating the customer's name.

### 4. Delete a Customer

`DELETE /remove-user`

- **Description:** Deletes a customer and all their associated address and company information from the database based on their `customer_id`.
- **Request Body (JSON):**

  ```json
  {
    "id": 1
  }
  ```

- **Response:**
  - `200 OK`
  - Body: `User Deleted`
- **Notes:** This operation performs deletions across the `customers`, `address`, and `company` tables to ensure data consistency.
