-- Create Tables

-- Customer table
CREATE TABLE IF NOT EXISTS customers 
(
customer_id INT AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,  
PRIMARY KEY (customer_id)
);

-- Address table
CREATE TABLE IF NOT EXISTS address 
(
 address_id INT AUTO_INCREMENT,
 customer_id INT(11) NOT NULL,
 address VARCHAR(255) NOT NULL,
 PRIMARY KEY (address_id),
 FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
);

-- Company table
CREATE TABLE IF NOT EXISTS company (
        company_id INT AUTO_INCREMENT,
        customer_id INT(11) NOT NULL,
        company VARCHAR(255) NOT NULL,
        PRIMARY KEY (company_id),
        FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
    )


-- Insert customer
INSERT INTO customers (name) VALUES (?);
-- Insert address
INSERT INTO address (customer_id, address) VALUES (?, ?);
-- Insert company 
INSERT INTO company (customer_id, company) VALUES (?, ?);
    


 -- Select all
 SELECT * FROM customers JOIN address JOIN company ON customers.customer_id = address.customer_id AND customers.customer_id = company.customer_id

-- Select specific data
SELECT customers.customer_id AS id, customers.name, address.address, company.company FROM customers JOIN address JOIN company ON customers.customer_id = address.customer_id AND customers.customer_id = company.customer_id

-- Update customer name
UPDATE customers SET name = ? WHERE customer_id = ?;


-- Delete customer
DELETE FROM customers WHERE customer_id = ?;
DELETE FROM address WHERE customer_id = ?;
DELETE FROM company WHERE customer_id = ?;