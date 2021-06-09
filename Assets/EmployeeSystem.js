const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_systemDB",
});

connection.connect((err) => {
  if (err) throw err;
  runMenu();
});

const runMenu = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Please select an option:",
      choices: [
        "View departments",
        "View roles",
        "View employees",
        "Add departments",
        "Add roles",
        "Add employees",
        "Update employee",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View departments":
          viewDept();
          break;

        case "View roles":
          viewRole();
          break;

        case "View employees":
          viewEmpl();
          break;

        case "Add departments":
          addDept();
          break;

        case "Add roles":
          addRole();
          break;

        case "Add employees":
          addEmpl();
          break;

        case "Update employee":
          updateEmpl();
          break;

        case "Exit":
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const viewDept = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    runMenu();
  });
};

const viewRole = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    runMenu();
  });
};

const viewEmpl = () => {
  const query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    runMenu();
  });
};

const addDept = () => {
  inquirer
    .prompt([
      {
        name: "deptName",
        type: "input",
        message: "Enter department name.",
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO department SET ?";
      connection.query(
        query,
        {
          department: answer.deptName,
        },
        (err, res) => {
          if (err) throw err;
          runMenu();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        name: "titleName",
        type: "input",
        message: "Enter role title.",
      },
      {
        name: "salary",
        type: "input",
        message: "Enter the salary.",
      },
      {
        name: "departmentID",
        type: "input",
        message: "Enter the department ID.",
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO role SET ?";
      connection.query(
        query,
        {
          title: answer.titleName,
          salary: answer.salary,
          department_id: answer.departmentID,
        },
        (err, res) => {
          if (err) throw err;
          runMenu();
        }
      );
    });
};

const addEmpl = () => {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Enter the employee's first name.",
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter the employee's last name.",
      },
      {
        name: "roleID",
        type: "input",
        message: "Enter the employee's role ID.",
      },
      {
        name: "managerID",
        type: "input",
        message: "Enter the employee manager's ID.",
      },
    ])
    .then((answer) => {
      const query = "INSERT INTO employee SET ?";
      connection.query(
        query,
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleID,
          manager_id: answer.managerID,
        },
        (err, res) => {
          if (err) throw err;
          runMenu();
        }
      );
    });
};

const updateEmpl = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message:
          "Please enter the ID of the employee you would like to change the role of:",
        name: "empUpd",
      },
      {
        type: "input",
        message: "Please enter the new role ID:",
        name: "roleUpdateID",
      },
    ])
    .then((answer) => {
      connection.query(
        `UPDATE employee SET role_id = ${answer.roleUpdateID} WHERE id = ${answer.empUpd}`
      );
      runMenu();
    });
};
