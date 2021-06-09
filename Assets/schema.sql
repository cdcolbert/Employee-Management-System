DROP DATABASE IF EXISTS employee_systemDB;
CREATE database employee_systemDB;

USE employee_systemDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL
);

INSERT INTO department (department)
VALUES ("Call Desk"), ("Networking"), ("Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 122000.00, 0100), ("Support Technician", 35000.00, 0526), ("Service Technician", 42000.00, 0644);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Corey", "Colbert", 0001, 0001), ("Meghan", "Colbert", 0002, 00002), ("Courtney", "Colbert", 0003, 00003);

SELECT * FROM role;