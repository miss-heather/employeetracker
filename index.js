const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "He@ther21899",
    database: "employees_db",
  },
  console.log(`Welcome to the employee database!`)
);

console.table();

const startApp = async () => {
  do{
    try {
      const ans = await inquirer.prompt({
        type: "list",
        name: "todo",
        message: "What would you like to do?",
        choices: [
          "View Departments",
          "View Roles",
          "View Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "I'm Finished",
        ],
      });
      switch (ans.todo) {
        case "View Departments":
          await viewDepartments();
          break;
        case "View Roles":
          await  viewRoles();
          break;
        case "View Employees":
          viewEmployeeDir();
          break;
        case "Add Department":
         await addDepartment();
          break;
        case "Add Employee":
          await addEmployee();
          break;
        case "Add Role":
          await addRole();
          break;
        case "Update Employee Role":
          updateEmployee();
          break;
        case "I'm Finished":
          process.exit();
          break;
          default:
            break;
      }
    } catch (err) {
      console.log(err);
    }
  }while (true)
};


async function viewDepartments() {
    const sql = `SELECT * FROM department`;
  let info;
 db.query(sql, (err, results) => {
      if (err) throw err;
  info = results
  console.table(info)
    });
   
  }

async function viewRoles() {
    const sql = `SELECT role.title AS title, department.name AS department, role.salary
    FROM role
    LEFT JOIN department ON role.department_id = department.id
    ORDER BY role.salary DESC`;
  
     db.query(sql, (err, results) => {
      if (err) throw err;
  
      console.table(results);
  
    });
  }
  
async function viewEmployeeDir() {
  console.log("test");
  try {
    const [employees] = await db.promise().query("select * from employee");
    console.table(employees);
    // startApp();
  } catch (err) {
    console.log(err);
  }
}

async function addDepartment() {
  const ans = await inquirer.prompt({
    type: "input",
    name: "department",
    message: "Which department would you like to add?",
  });
  await db
    .promise()
    .query(`INSERT INTO department (name) VALUES ('${ans.department}')`);
  viewDepartments();
}

async function addRole() {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query("SELECT name FROM department", (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });

    const choices = results.map((result) => result.name);

    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the new role's title?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the new role's salary?",
      },
      {
        type: "list",
        name: "department",
        message: "What is the new role's department?",
        choices: choices,
      },
    ]);

    const query = `
      INSERT INTO role (title, salary, department_id)
      VALUES (?, ?, (SELECT id FROM department WHERE name = ?))
    `;
    const values = [answers.title, answers.salary, answers.department];

  await new Promise((resolve, reject) => {
      db.query(query, values, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
     await viewRoles()
  } catch (err) {
    throw err;
  }
}
async function addEmployee() {
  const [roles] = await db.promise().query("select * from role");
  const [employees] = await db.promise().query("select * from employee");
  console.log(employees);
  const ans = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Please enter the employee's first name.",
    },
    {
      type: "input",
      name: "last_name",
      message: "Please enter the employee's last name",
    },
    {
      type: "list",
      name: "role_id",
      message: "Please choose from one of the roles below",
      choices: roles.map(({ title, id }) => ({
        name: title,
        value: id,
      })),
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who is the the manager of the employee?",
      choices: employees.map(({ first_name, last_name, id }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      })),
    },
  ]);
  console.log(ans);
  await db
    .promise()
    .query(
      `INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES ('${ans.first_name}','${ans.last_name}', ${ans.role_id}, ${ans.manager_id})`
    );
  viewEmployeeDir();
}

async function updateEmployee() {
  const [employees] = await db.promise().query("select * from employee");
  const [roles] = await db.promise().query("select * from role");
  const ans = await inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Which employee is changing roles?",
      choices: employees.map(({ first_name, last_name, id }) => ({
        name: `${first_name} ${last_name}`,
        value: id,
      })),
    },
    {
      type: "list",
      name: "role",
      message: "What is the employee's new role?",
      choices: roles.map(({ title, id }) => ({
        name: title,
        value: id,
      })),
    },
  ]);
  await db
    .promise()
    .query(
      `UPDATE employee SET role_id = ${ans.role} WHERE id = ${ans.employee}`
    );
  viewEmployeeDir();
}

startApp();