USE employees_db;
INSERT INTO department (name)
VALUES ("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role (title,salary,department_id)
VALUES ("Sales Lead", 150000,1),
("Lead Engineer", 180000,2),
("Salesperson", 310000,1),
("Software Engineer", 150000,2),
("Accountant", 120000,3),
("Legal Team Lead", 320000,4),
("Lawyer", 150000,4),
("Account Manager", 240000,1);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Spongebob", "Squarepants", 1, null),
("Patrick", "Starfish", 2, 1),
("Squidward", "Tenticles", 3, 2),
("Sandy", "Seashells", 4, 1),
("Captain", "Pirate", 5, 2);
