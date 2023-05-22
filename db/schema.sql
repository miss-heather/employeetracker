-- DROP DATABASE IF EXISTS employees_db;
-- CREATE DATABASE employees_db;

-- USE employees_db;

-- CREATE TABLE department (
-- id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
-- name VARCHAR(30) NOT NULL
-- );
-- CREATE TABLE role (
-- id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
-- title VARCHAR(30),
-- salary DECIMAL NOT NULL,
-- department_id INT,
-- FOREIGN KEY (department_id)
-- REFERENCES department(id)
-- ON DELETE CASCADE
-- );
-- CREATE TABLE employee (
-- id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
-- first_name VARCHAR(30) NOT NULL,
-- last_name VARCHAR(30) NOT NULL,
-- -- role_id INT NOT NULL,
-- CONSTRAINT fk_role 
-- FOREIGN KEY (role_id) 
-- REFERENCES roles(id),
-- manager_id INTEGER
-- -- ON DELETE CASCADE,
-- -- CONSTRAINT fk_manager FOREIGN KEY (manager_id)
-- -- REFERENCES employee(id)
-- -- ON DELETE SET NULL
-- );

DROP database if EXISTS employees_db;

CREATE database employees_db;

USE employees_db;

CREATE TABLE department (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30), 
salary DECIMAL,
department_id INT,
FOREIGN KEY (department_id)
REFERENCES department(id)
ON DELETE CASCADE
);

CREATE TABLE employee (
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT DEFAULT NULL
);